# -*- coding: utf-8 -*-
"""
Gera a "versão no papel" dos artigos do portal ENTRELINHAS com o layout
padronizado (Carta, coluna única justificada, cabeçalho/rodapé da marca).

Reproduz o layout dos PDFs existentes em public/artigos/pdf/. Usa as fontes
Base-14 (Times/Helvetica), sempre disponíveis e visualmente equivalentes ao
DejaVu Serif / Liberation Sans usados na primeira leva.

Uso:
    python scripts/article-pdf.py prisma/_pdf-input.json
Entrada: JSON array de { slug, title, subject, excerpt, author, publishedAt, body }
Saída:   public/artigos/pdf/<slug>.pdf
"""
import sys, os, json, math, re
import fitz  # PyMuPDF

# ---- geometria (extraída dos PDFs padronizados existentes) ----
PW, PH = 612.0, 792.0          # Carta
ML, MR = 81.0, 531.0           # margens esquerda/direita
CW = MR - ML                   # largura de conteúdo (450)
CENTER = PW / 2
HEADER_RULE_Y = 52.0
FOOTER_RULE_Y = 731.5
BODY_BOTTOM = 723.0            # última baseline possível antes do rodapé
BODY_TOP_CONT = 84.0           # 1ª baseline do corpo em páginas de continuação

# ---- cores ----
INK    = (0.102, 0.102, 0.102)   # #1a1a1a
ACCENT = (0.180, 0.353, 0.420)   # #2e5a6b
BEIGE  = (0.847, 0.823, 0.784)   # #d8d2c8
MUTED  = (0.420, 0.420, 0.420)   # #6b6b6b
FOOT   = (0.604, 0.576, 0.541)   # #9a938a

# ---- tipografia ----
BODY_SIZE, BODY_LEAD = 11.5, 17.8
H2_SIZE,  H2_LEAD     = 14.0, 19.0
H2_BEFORE, H2_AFTER   = 12.0, 6.0
PARA_AFTER            = 6.0
TITLE_SIZE, TITLE_LEAD = 28.0, 38.0
DEK_SIZE,   DEK_LEAD   = 15.0, 21.8

# fontes Base-14: (nome p/ insert_text, objeto p/ medir)
FN = {
    "serif":   "tiro", "serif-b": "tibo", "serif-i": "tiit",
    "sans":    "helv", "sans-b":  "hebo", "sans-i":  "heit",
}
FONTS = {k: fitz.Font(v) for k, v in FN.items()}

SUBJECTS = {
    "politica": "Política", "espiritualidade": "Espiritualidade",
    "cultura": "Cultura", "interdisciplinar": "Interdisciplinar",
    "ciencia-tecnologia": "Ciência e Tecnologia",
    "entretenimento": "Entretenimento", "saude": "Saúde",
    "sociedade": "Sociedade",
}
MESES = ["", "janeiro", "fevereiro", "março", "abril", "maio", "junho",
         "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]


def fmt_date(iso: str) -> str:
    d = iso[:10].split("-")
    return f"{int(d[2])} de {MESES[int(d[1])]} de {d[0]}"


def reading_time(body: str) -> int:
    words = len(re.findall(r"\S+", re.sub(r"!\[.*?\]\(.*?\)", "", body)))
    return max(1, math.ceil(words / 200))


def text_len(style, size, s):
    return FONTS[style].text_length(s, fontsize=size)


def wrap(style, size, s, width):
    """Quebra texto em linhas (lista de listas de palavras)."""
    space = text_len(style, size, " ")
    lines, cur, curw = [], [], 0.0
    for w in s.split():
        ww = text_len(style, size, w)
        if cur and curw + space + ww > width:
            lines.append(cur)
            cur, curw = [w], ww
        else:
            curw = curw + space + ww if cur else ww
            cur.append(w)
    if cur:
        lines.append(cur)
    return lines


class Doc:
    def __init__(self):
        self.doc = fitz.open()
        self.page = None
        self.y = 0.0

    # -- molduras --
    def _chrome(self):
        p = self.page
        # cabeçalho
        p.insert_text((ML, 43.0), "E N T R E L I N H A S",
                      fontname=FN["sans-b"], fontsize=9, color=INK)
        ed = "Portal editorial"
        p.insert_text((MR - text_len("sans-i", 8, ed), 43.0), ed,
                      fontname=FN["sans-i"], fontsize=8, color=MUTED)
        p.draw_line((ML, HEADER_RULE_Y), (MR, HEADER_RULE_Y),
                    color=BEIGE, width=0.5)
        # rodapé
        n = self.doc.page_count
        p.draw_line((ML, FOOTER_RULE_Y), (MR, FOOTER_RULE_Y),
                    color=BEIGE, width=0.5)
        p.insert_text((ML, 744.0), "© 2026 Entrelinhas",
                      fontname=FN["sans"], fontsize=8, color=FOOT)
        tag = "Leitura atenta, nas entrelinhas do que importa."
        p.insert_text((CENTER - text_len("sans-i", 8, tag) / 2, 744.0), tag,
                      fontname=FN["sans-i"], fontsize=8, color=FOOT)
        pg = f"Página {n}"
        p.insert_text((MR - text_len("sans", 8, pg), 744.0), pg,
                      fontname=FN["sans"], fontsize=8, color=FOOT)
        url = "entrelinhas-6kpa.vercel.app"
        p.insert_text((CENTER - text_len("sans", 7.5, url) / 2, 754.0), url,
                      fontname=FN["sans"], fontsize=7.5, color=ACCENT)

    def new_page(self, body_top):
        self.page = self.doc.new_page(width=PW, height=PH)
        self._chrome()
        self.y = body_top

    def _ensure(self, need):
        if self.y + need > BODY_BOTTOM:
            self.new_page(BODY_TOP_CONT)

    # -- linhas --
    def _line(self, x, y, words, style, size, color, width, justify):
        p = self.page
        if justify and len(words) > 1:
            tw = sum(text_len(style, size, w) for w in words)
            extra = (width - tw) / (len(words) - 1)
            cx = x
            for w in words:
                p.insert_text((cx, y), w, fontname=FN[style],
                              fontsize=size, color=color)
                cx += text_len(style, size, w) + extra
        else:
            p.insert_text((x, y), " ".join(words), fontname=FN[style],
                          fontsize=size, color=color)

    def paragraph(self, text, style, size, lead, color, justify=True):
        lines = wrap(style, size, text, CW)
        for i, ln in enumerate(lines):
            self._ensure(0)
            last = i == len(lines) - 1
            self._line(ML, self.y, ln, style, size, color, CW,
                       justify and not last)
            self.y += lead

    def heading(self, text):
        self.y += H2_BEFORE
        self._ensure(H2_LEAD)
        self.paragraph(text, "serif-b", H2_SIZE, H2_LEAD, INK, justify=False)
        self.y += H2_AFTER

    def caption(self, text):
        self.y += 4
        lines = wrap("serif-i", 10, text, CW - 40)
        for ln in lines:
            self._ensure(0)
            s = " ".join(ln)
            self._line(CENTER - text_len("serif-i", 10, s) / 2, self.y,
                       ln, "serif-i", 10, MUTED, CW, False)
            self.y += 14
        self.y += 4

    # -- bloco de título (1ª página) --
    def header_block(self, art):
        self.new_page(0)  # body_top ajustado abaixo
        p = self.page
        y = 79.0
        kicker = "ARTIGOS   •   " + SUBJECTS.get(art["subject"],
                                                 art["subject"]).upper()
        p.insert_text((ML, y), kicker, fontname=FN["sans-b"],
                      fontsize=9, color=ACCENT)
        # título
        y = 110.0
        for ln in wrap("serif-b", TITLE_SIZE, art["title"], CW):
            p.insert_text((ML, y), " ".join(ln), fontname=FN["serif-b"],
                          fontsize=TITLE_SIZE, color=INK)
            y += TITLE_LEAD
        # dek
        if art.get("excerpt"):
            y += 4
            for ln in wrap("serif-i", DEK_SIZE, art["excerpt"], CW):
                p.insert_text((ML, y), " ".join(ln), fontname=FN["serif-i"],
                              fontsize=DEK_SIZE, color=MUTED)
                y += DEK_LEAD
        # meta: autor • categoria • tempo • data
        y += 18
        sep = "    •    "
        parts = [
            (art["author"], "sans-b", INK),
            (sep, "sans", BEIGE),
            (SUBJECTS.get(art["subject"], art["subject"]), "sans", MUTED),
            (sep, "sans", BEIGE),
            (f"{reading_time(art['body'])} min de leitura", "sans", MUTED),
            (sep, "sans", BEIGE),
            (fmt_date(art["publishedAt"]), "sans", MUTED),
        ]
        cx = ML
        for txt, st, col in parts:
            p.insert_text((cx, y), txt, fontname=FN[st], fontsize=9, color=col)
            cx += text_len(st, 9, txt)
        # régua de destaque
        y += 16
        p.draw_line((ML, y), (MR, y), color=ACCENT, width=1.0)
        self.y = y + 24  # início do corpo

    def render(self, art):
        self.header_block(art)
        for raw in art["body"].split("\n"):
            block = raw.strip()
            if not block:
                continue
            m = re.match(r"^!\[(.*?)\]\((.*?)\)$", block)
            if m:
                if m.group(1):
                    self.caption(m.group(1))
                continue
            if block.startswith("## "):
                self.heading(block[3:])
            elif block.startswith("### "):
                self.heading(block[4:])
            else:
                self.paragraph(block, "serif", BODY_SIZE, BODY_LEAD, INK)
                self.y += PARA_AFTER


def main():
    inp = sys.argv[1] if len(sys.argv) > 1 else "prisma/_pdf-input.json"
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    outdir = os.path.join(root, "public", "artigos", "pdf")
    os.makedirs(outdir, exist_ok=True)
    arts = json.load(open(inp, encoding="utf-8"))
    for art in arts:
        d = Doc()
        d.render(art)
        path = os.path.join(outdir, art["slug"] + ".pdf")
        d.doc.set_metadata({
            "title": art["title"], "author": art["author"],
            "producer": "Entrelinhas", "creator": "Entrelinhas",
        })
        d.doc.save(path, deflate=True)
        pages = d.doc.page_count
        d.doc.close()
        print("   PDF:", art["slug"] + ".pdf", f"({pages}p)")
    print("[ok] PDFs gerados em public/artigos/pdf/")


if __name__ == "__main__":
    main()
