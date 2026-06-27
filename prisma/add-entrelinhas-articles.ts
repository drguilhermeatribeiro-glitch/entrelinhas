// Publica (upsert por slug) os três artigos da proposta "ENTRELINHAS COMP".
// Não apaga nada: só insere/atualiza estes três. Uso: npm run db:add-comp
import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { createAdapter } from "../src/lib/db-adapter";

const prisma = new PrismaClient({ adapter: createAdapter() });

const AUTHOR = "Guilherme Augusto Turbino Ribeiro";

type Art = {
  slug: string;
  title: string;
  subject: string;
  excerpt: string;
  coverImage: string | null;
  publishedAt: string;
  body: string;
};

const articles: Art[] = [
  {
    slug: "paradoxo-democracia-conselhos-de-medicina",
    title:
      "Quando a democracia se fortalece, as entidades de classe se enfraquecem: o paradoxo do Brasil de 2026",
    subject: "politica",
    excerpt:
      "Um ato de prevenção do médico — e não de prevenção médica — em um país cada vez mais guiado por narrativas.",
    coverImage: "/artigos/entrelinhas-tce-bolsonaro.png",
    publishedAt: "2026-01-12T12:00:00.000Z",
    body: `Em 07/01/2026, o ex-presidente Jair Messias Bolsonaro sofreu uma queda durante a madrugada, resultando em traumatismo cranioencefálico (TCE) leve em sua cela de estado-maior na Superintendência da Polícia Federal em Brasília, onde cumpre pena em regime fechado desde setembro de 2025. Na manhã do mesmo dia, sua defesa solicitou ao Ministro Alexandre de Moraes autorização para que fosse levado ao Hospital DF Star, em Brasília, para reavaliação por sua equipe médica, mas o pedido foi negado. Diante da repercussão do caso, o Conselho Federal de Medicina recebeu denúncias e determinou que o Conselho Regional de Medicina do Distrito Federal (CRM-DF) instaurasse sindicância para apuração preliminar dos fatos. Posteriormente, por decisão do Ministro Alexandre de Moraes, o procedimento foi anulado, sob fundamentos de ordem institucional e jurídica, conforme expresso no despacho judicial.

Imagine seu pai ou avô batendo a cabeça ao cair da cama enquanto dorme. A principal preocupação, nesse caso, é saber se houve lesão no crânio. Agora imagine uma situação diferente: ele se levanta, cai e não consegue explicar o que sentiu antes da queda. Aqui, o trauma continua preocupando, mas passa a ser também consequência de algo maior — como um desmaio, uma arritmia ou até um evento neurológico. Como médico, quando estou em plantões de pronto atendimento e me deparo com situações de TCE, essa é uma das primeiras perguntas que faço: foi uma queda puramente mecânica ou houve algo que a precipitou? Porque essa diferença muda o risco e, sobretudo, a urgência da investigação.

O atendimento médico prestado a Jair Bolsonaro por ocasião do traumatismo cranioencefálico (TCE) leve sofrido é descrito no despacho do Ministro Alexandre de Moraes que determinou a anulação da sindicância instaurada pelo CRM-DF para apuração da conduta médica no caso. O documento judicial transcreve um relatório médico elaborado pela equipe da Polícia Federal, não sendo possível inferir, a partir de seu conteúdo, se tal descrição corresponde à integralidade da evolução clínica registrada em prontuário ou se se trata de excerto selecionado para fins de fundamentação da decisão. Ainda assim, os dados clínicos ali consignados permitem análise técnica consistente da conduta adotada.

No relatório, registra-se que a queda teria ocorrido enquanto o ex-presidente dormia, versão que diverge do relato público da ex-primeira-dama Michelle Bolsonaro, segundo o qual Bolsonaro teria se levantado e, em seguida, sofrido a queda. Do ponto de vista médico, variações narrativas em contexto de TCE não costumam ser interpretadas como indício de má-fé, mas como possível expressão de alterações cognitivas transitórias, como confusão mental ou prejuízo de memória. O fato de existirem versões distintas sobre a dinâmica do evento — queda da cama durante o sono ou queda após levantar-se — impõe, por si só, maior cautela clínica quando a mecânica do trauma não está plenamente esclarecida.

Além disso, o próprio relatório médico transcrito descreve fatores objetivos que, na prática clínica cotidiana, elevam de forma significativa o risco de complicações intracranianas e ampliam a indicação de investigação por imagem: uso recente de anticoagulante, relato de tontura no dia anterior, instabilidade ortostática ao exame físico e idade superior a 70 anos. Isoladamente, cada um desses elementos já demanda vigilância acrescida; em conjunto, configuram cenário classicamente enquadrado, nas principais diretrizes internacionais sobre TCE, como indicação robusta para realização de tomografia computadorizada (TC) de crânio em tempo oportuno, com o objetivo de excluir lesões potencialmente graves.

Nesse contexto, pode causar perplexidade técnica o fato de não constar, no relatório transcrito, orientação explícita para a realização de exame de imagem, sobretudo porque os próprios fatores que fundamentam essa conduta foram reconhecidos e descritos no documento. Observa-se que o profissional registrou elementos clínicos relevantes, inserindo-os no contexto da avaliação, ainda que em um cenário que, à luz da prática baseada em evidências, costuma ser associado à indicação de TC de crânio.

Chama igualmente a atenção o fato de que a evolução médica, enquanto gênero técnico, deve atender a requisitos mínimos independentemente do modelo adotado: descrição da queixa principal, história da moléstia atual, antecedentes clínicos relevantes, hipóteses diagnósticas e conduta adotada. No trecho transcrito no despacho, esses elementos não aparecem de forma completa. O texto limita-se à descrição do evento traumático e aos achados colhidos na avaliação inicial, sem explicitar hipóteses diagnósticas nem o racional clínico para a dispensa do exame. A opção por não realizar a TC surge de forma indireta, na narrativa do próprio despacho judicial, e não como conduta clínica detalhadamente justificada na redação médica transcrita.

Diante desses elementos — extraídos de informações tornadas públicas pela imprensa e do próprio despacho do Supremo Tribunal Federal — e considerando tratar-se de ato médico, mostra-se tecnicamente legítima a instauração de procedimento de sindicância estritamente voltado à análise da conduta profissional adotada no atendimento ao ex-presidente.

Cabe lembrar que, diferentemente do Direito, em que a interpretação admite maior margem de subjetividade, a Medicina opera sob discricionariedade muito mais limitada, ancorada em evidências científicas continuamente atualizadas e consolidadas em protocolos assistenciais. Nesse sentido, o enquadramento clínico descrito no caso se alinha, de forma consistente, à recomendação de TC de crânio em curto prazo nas principais diretrizes que tratam do manejo do TCE, o que torna legítimo o questionamento técnico acerca de conduta diversa.

O Conselho Federal de Medicina e os conselhos regionais dispõem, para esse fim, do instrumento da sindicância — procedimento legal, preliminar e técnico, instaurado a partir de denúncia formal, que não se confunde com punição ou acusação. Trata-se de mecanismo institucional essencial, que simultaneamente assegura o direito da sociedade ao escrutínio e protege o médico contra imputações infundadas, permitindo que apenas situações com indícios concretos avancem para investigação formal. Não por acaso, neste caso, o CFM limitou-se a determinar ao CRM-DF a instauração da sindicância, em estrita observância ao rito institucional previsto.

Faço essa consideração para que se compreenda a gravidade do que está em debate. Diante da ampla publicidade do caso, o CFM recebeu denúncias e, portanto, material potencialmente apto à abertura de sindicância — o que de fato ocorreu, conforme comunicado oficial emitido em 7 de janeiro. Em resposta, uma decisão do Ministro Alexandre de Moraes determinou a anulação da sindicância, sob o entendimento de desvio de finalidade e ilegitimidade da atuação da entidade no caso concreto, além de ordenar que o presidente do Conselho prestasse esclarecimentos à Polícia Federal no prazo de dez dias, para apuração de eventual responsabilidade criminal, conforme consta expressamente na decisão judicial.

Como justificativa para seu despacho, o ministro afirma que “não houve qualquer omissão ou inércia da equipe médica da Polícia Federal, que atuou correta e competentemente”, sustentando tal conclusão a partir do relatório médico amplamente discutido. Do ponto de vista médico, é possível observar que a descrição clínica constante do documento não se encontra plenamente alinhada ao racional que, segundo diretrizes amplamente aceitas, costuma orientar a conduta em situações análogas. Ademais, o despacho faz referência a exames realizados posteriormente em ambiente hospitalar, cuja normalidade é apresentada como elemento corroborativo da adequação da conduta inicial.

Tal encadeamento argumentativo, quando publicizado, pode induzir à interpretação de que a ausência de achados relevantes em exames posteriores serviria como critério retrospectivo para afastar a indicação prévia de investigação por imagem. Na prática médica, entretanto, muitas condutas são indicadas justamente para evitar desfechos adversos, ainda que estes não venham a se concretizar — lógica que fundamenta a existência de protocolos preventivos e diretrizes clínicas.

É compreensível que a repercussão pública tenha se concentrado no fato concreto que deu origem a essa sucessão de eventos. Ainda assim, mais preocupante do que o episódio em si é o efeito institucional que decisões dessa natureza podem produzir, bem como a mensagem transmitida a magistrados de instâncias inferiores, que lidam cotidianamente com conflitos semelhantes. Não se trata apenas de anular um procedimento específico, mas de vedar, em âmbito nacional, qualquer atuação dos Conselhos de Medicina com esse mesmo objeto. Atos praticados nas instâncias superiores raramente se esgotam em seus próprios limites: eles orientam condutas, estabelecem balizas e produzem efeitos que se irradiam por todo o sistema.

A história mostra que decisões tomadas no topo do poder possuem relevante efeito pedagógico. Em 13 de dezembro de 1968, o então vice-presidente da República, Pedro Aleixo, afirmou confiar no presidente, mas não no “guardinha da esquina”, ao votar contra a instauração do AI-5. A advertência dizia respeito menos ao conteúdo formal do ato e mais às consequências práticas de sua aplicação em cadeia. A tortura jamais foi formalmente regulamentada no Brasil, mas ocorreu durante a vigência daquele período histórico.

Se o Brasil é, de fato, uma democracia, não deveria ser motivo de temor que um médico se manifeste com base em fatos públicos, diretrizes técnicas e instrumentos legais. Defender o Conselho que representa a classe médica não é corporativismo: é fortalecer um sistema que, amanhã, pode ser a principal linha de defesa do próprio exercício profissional. Viver em sociedade pressupõe observância e empatia, porque o lugar do outro hoje pode ser o nosso amanhã.

Dito isso, faço uma pergunta direta a você, que é médico: caso não haja um reposicionamento institucional quanto à postura até aqui adotada, você se sente plenamente seguro para tomar decisões clínicas fundamentadas em diretrizes validadas, independentemente de quem seja o paciente? E você, que não é médico, pergunto: se, no futuro, precisar de um laudo médico para sustentar sua própria defesa judicial, considera preservada a independência técnica do profissional responsável por esse documento? Por fim, é importante destacar que decisões judiciais de ampla publicidade, especialmente quando tratam de matéria técnica sensível, produzem efeitos que extrapolam o caso concreto e influenciam a percepção social sobre práticas profissionais e institucionais.

Como síntese do problema aqui discutido, talvez seja legítimo questionar se nossas instituições têm conseguido operar de forma consistente em favor do interesse público, como se espera em uma democracia madura. Em um cenário político marcado por tensões recorrentes e crises institucionais, cabe a nós, cidadãos comuns, o esforço de sustentar um debate sério, responsável e tecnicamente fundamentado — mesmo quando isso pareça inútil ou desestimulante. Democracia não se preserva pela indiferença, mas pela vigilância qualificada.`,
  },
  {
    slug: "do-alto-do-mulungu-as-urnas-2026",
    title: "Do alto do Mulungu às urnas de 2026",
    subject: "politica",
    excerpt:
      "O gesto na Sapucaí pode custar caro ao presidente Lula — e a resposta não está no judiciário, mas na sociedade.",
    coverImage: "/artigos/entrelinhas-carnaval-lula.png",
    publishedAt: "2026-02-20T12:00:00.000Z",
    body: `A Lei nº 9.504/1997 trata sobre propaganda eleitoral antecipada. Para sua desobediência, seria necessária a ocorrência de pedido explícito de voto, e o samba-enredo foi cuidadoso quanto a isso. O número 13 foi mencionado e repetido várias vezes. Vi juristas dizendo que, no contexto em que foi colocado, poderia haver intenção velada, mas dentro de certa “licença poética”, cujo uso como fundamento de condenação poderia flertar com censura à expressão artística. Por outro lado, vi alguns sustentando que essa menção, aliada ao “Olê, olê, olê, Lula, Lula” — jingle clássico do presidente — bem como a pautas atuais ou futuras do petista, como a escala 6x1 e a defesa da soberania, poderiam ser vistas como pautas de um comício atual e, portanto, que, se associadas, configurariam propaganda eleitoral antecipada.

Contudo, é fato que, para uma condenação aqui, haveria margem para interpretação contrária, uma vez que eventual sentença dependeria de interpretação contextual e não de um fato concreto, como o pedido explícito de voto. Ademais, a penalidade prevista é mínima — no máximo, multa de R$ 25.000. Isso não representaria nada para a campanha do maior personagem político das últimas décadas no Brasil.

Já a acusação de abuso de poder político ou econômico, prevista na Lei Complementar nº 64/1990 e que pode resultar em inelegibilidade, exigiria que houvesse assimetria na oferta de recursos financeiros do governo federal à escola Acadêmicos de Niterói. O que se sabe até o momento é que houve repasse igualitário entre as escolas de samba: R$ 12.000.000 destinados do governo federal à Embratur, que, por sua vez, repassou R$ 1.000.000 para cada escola. Lula, ademais, teve o cuidado de não desfilar, assim como a primeira-dama, Janja, e também cumprimentou as demais escolas que passaram pela avenida — Imperatriz Leopoldinense, Portela e Mangueira.

Diante disso, entendo que a direita tem muito mais a ganhar explorando a reação da sociedade em virtude de pautas como a ala crítica ao conservadorismo, que trouxe, de forma jocosa, a família tradicional e as igrejas evangélicas. A OAB-RJ já emitiu nota de repúdio, o que poderia ser acompanhado pela CNBB, por igrejas evangélicas e por lideranças políticas e partidárias. Um repúdio oriundo da sociedade civil é muito mais identificado com uma bandeira de direita do que a judicialização da questão, sobretudo em um país cujo Judiciário vive uma crise de confiança e enfrenta questionamentos públicos relevantes.

![Ala “Família em conserva” no desfile da Acadêmicos de Niterói, na Marquês de Sapucaí, em 15/02/2026, dentro do enredo “Do alto do mulungu surge a esperança: Lula, o operário do Brasil”.](/artigos/entrelinhas-familia-em-conserva.png)

Se dialogarmos com O Príncipe, de Maquiavel, podemos aplicar aqui os conceitos de virtù e fortuna, apresentados logo no início da obra como ferramentas para o exercício estável do poder. Evidentemente, é necessário adequar o raciocínio ao contexto republicano, visto que o clássico texto do início do século XVI foi escrito sob uma lógica monárquica. Ainda assim, Maquiavel sugere que a virtù consiste na capacidade do governante de agir com inteligência, aproveitar oportunidades e criar instrumentos de legitimação do poder, sobretudo aqueles capazes de manter estabilidade diante da fortuna — isto é, da imprevisibilidade, que pode ser benéfica ou adversa.

Imaginemos o evento de 8 de janeiro como uma fortuna — um fato imprevisível. Bolsonaro havia passado o comando das Forças Armadas a Lula ainda em dezembro de 2022, não impediu a passagem da faixa presidencial e encontrava-se fora do Brasil. A chamada “minuta do golpe” não continha assinatura. Não conheço fatos que permitam afirmar que ele estivesse nos Estados Unidos liderando os ataques. Trato, portanto, esse episódio no campo da imprevisibilidade, ainda que fosse um risco politicamente temido. Se sua postura ao longo da pandemia tivesse sido diferente, se tivesse agregado mais decoro e mais capital simbólico à sua trajetória, talvez tivesse construído virtù suficiente para blindá-lo politicamente das acusações que enfrentou diante daquela fortuna.

Surge aqui, portanto, uma oportunidade concreta para a direita dar um exemplo de defesa da liberdade de expressão mesmo quando o conteúdo expresso lhe é desfavorável e até agressivo. Tal gesto pode ser utilizado futuramente como prova de coerência, inclusive diante de novas acusações. Em um ambiente em que parte da esquerda consolidou o estigma de “fascismo” associado ao bolsonarismo, um exemplo concreto de tolerância pode funcionar como blindagem política e reputacional.

Também deve-se considerar que a reafirmação da direita sobre o lulismo seria muito mais efetiva vencendo o próprio Lula nas urnas do que tornando-o inelegível. A inelegibilidade abriria espaço para a construção de uma narrativa de perseguição e injustiça histórica, cristalizando a ideia de que Lula teria sido impedido de disputar sua reeleição por uma direita golpista e antidemocrática. Vencê-lo no voto, por outro lado, neutralizaria essa retórica e produziria uma vitória politicamente mais robusta e legitimadora.

Em síntese, juridicamente o ganho é pequeno e incerto; politicamente, o custo da judicialização pode ser elevado. A resposta estratégica talvez esteja menos no Judiciário e mais na sociedade civil e, sobretudo, nas urnas.`,
  },
  {
    slug: "maquiavel-nunca-foi-o-vilao",
    title: "Maquiavel nunca foi o vilão — talvez nós sejamos ingênuos",
    subject: "interdisciplinar",
    excerpt: "Poder, forma e a história brasileira sob a lente de O Príncipe.",
    coverImage: null,
    publishedAt: "2026-03-10T12:00:00.000Z",
    body: `Maquiavel talvez seja o pensador mais falado por gente que desconhece o que ele pensava ao escrever aquele que o levaria do efêmero exílio de Florença em 1513 a incontáveis bibliotecas e, mais recentemente, às plataformas literárias digitais ao redor do mundo — e por toda a eternidade, certamente. E o curioso, fazendo um rápido paralelo teológico, sem querer fugir do foco deste texto, é que o legado popular de Maquiavel exibe uma nítida distorção em relação ao legado acadêmico, tal como, à época da condenação de Cristo, sua postura foi distorcida pelos populares.

“Dai a César o que é de César e a Deus o que é de Deus” é o cerne do que levou a multidão a condenar Jesus em troca do rebelde Barrabás. A literalidade aliada à má vontade em crer na boa-fé do próximo fez com que a multidão que assistiu à condenação do filho de Deus o chamasse de impostor, negando a possibilidade de a postura pacifista perante os abusos do império romano significar, na verdade, a defesa da vida eterna em uma dimensão alcançada pela fé e regida pelas leis de Deus.

Sei que é inusitada ou até mesmo audaciosa essa minha comparação, mas vejamos como o dicionário define o termo “maquiavélico”: “relativo a Maquiavel ou ao maquiavelismo; astuto, ardiloso, que revela má-fé; que utiliza meios desleais ou pérfidos para atingir fins.” Qual o paralelo entre a definição do adjetivo que busca qualificar atitudes e o pensamento do filósofo Nicolau Maquiavel e o real ensinamento e intencionalidade por trás, sobretudo, do clássico livro “O Príncipe”, escrito pelo florentino?

Tal como na passagem bíblica aqui introduzida, o paralelo é a total assimetria entre o pensamento do autor e o entendimento do povo. Ainda neste paralelo, Jesus Cristo foi devidamente ressignificado perante a “opinião pública”, em menor dimensão, aos que assistiram à sua ressurreição. Em maior dimensão, chegou à devoção de todo o mundo ocidental quando o império romano percebeu que era mais vantajoso defender Jesus aos olhos do povo do que matar quem o adorava.

E por quê? A priori, uma vida pautada pelos princípios de amor e fé é “bem-quista” pelas pessoas; em outras palavras, constrói uma reserva moral que, em 1513, com a redação de “O Príncipe”, também pode ser entendida como “virtù”, isto é, o uso inteligente das oportunidades que vão ao encontro do monarca para a manutenção da estabilidade do poder frente à imprevisibilidade, definida pelo autor italiano como “fortuna”.

No capítulo XVIII de O Príncipe, Maquiavel afirma:

“Não é necessário que um príncipe possua todas as qualidades acima referidas, mas é muito necessário que pareça possuí-las.”

E no capítulo XVII adverte:

“Um príncipe deve fazer-se temer de modo que, se não conseguir ser amado, evite ao menos ser odiado.”

O imprevisível pode ser positivo ou não, sendo que os casos negativos podem, inclusive, derrubar o “dono do poder”, que, por sua vez, se torna mais invencível quanto maior for o seu saldo de estabilidade obtido pela virtù.

A época em que Nicolau Maquiavel escreveu “O Príncipe” — por volta de 1513, com publicação póstuma em 1532 — coincide com o florescimento do Renascimento, também na Itália. Tal evento histórico seria um marco de transição do pensamento ocidental, que conduziria a sociedade da concepção teocêntrica para a antropocêntrica.

Contudo, a transição do teocentrismo para o antropocentrismo representou uma reconstrução da forma, não da essência, que permaneceu sendo a sede pelo poder. Na França pós-Revolução Francesa, o aparente libertário Robespierre morreria decapitado tal como aquele que ele havia decapitado, revelando que talvez a hipocrisia seja a maior inimiga da “virtù”.

No Brasil colônia, o atraso não era apenas no desenvolvimento econômico e social, mas também no pensamento. Bastou a devassa da Conjuração Mineira para o exílio dos rebeldes e o enforcamento de Joaquim José da Silva Xavier, mais conhecido como Tiradentes.

O silêncio e a imagem de soberania de um país recém-independente talvez tenham sido úteis para manter o trono do Imperador do Brasil no período que marca a saída de Pedro I e o golpe da maioridade. O curioso é que o costume que Pedro II talvez sentisse em relação ao trono que ocupara desde tão cedo pode ter contribuído para que seus sonhos fossem mais voltados ao desenvolvimento intelectual.

Em 1888, o Brasil era o último país das Américas a abolir a escravidão. Em 1889, Pedro partiu para o exílio. Como definiu à época o jornalista Aristides Lobo: “O povo assistiu à Proclamação da República bestializado.”

Contudo, sem participação popular efetiva, bestializado ficou. Por isso considero a Proclamação da República o golpe de Estado mais profundo pelo qual o Brasil passou, não apenas pela forma como ocorreu, mas porque seguimos comemorando-o sem plena consciência das fragilidades institucionais que ali nasceram.

Se as primeiras páginas de um livro ditam o curso da história, as primeiras páginas da República ajudam a explicar muito do que somos enquanto brasileiros nos dias de hoje.

Maquiavel, ao escrever O Príncipe, não trouxe uma receita do mal: apenas explicou a quem quisesse ler como o poder se constrói e se mantém.

E até mesmo àqueles que desejam o poder para fazer o bem — pois a política é a única forma de transformar a vida das pessoas com a amplitude de uma nação — é preciso também saber como permanecer no poder e não ser derrubado por quem objetiva o mesmo trono com outros interesses.

Não basta propor um bom governo se o discurso que o sustenta despreza a forma política necessária para comunicar-se com o povo em seu tempo imediato. A aparência — no sentido maquiaveliano — não é frivolidade; é instrumento de governabilidade.

Por outro lado, essa forma não deve ser hipócrita, pois a guilhotina que decapitou Robespierre sempre se volta contra a cabeça de quem procura a estrada de poder percorrida pelo ex-líder francês.

Em sentido contrário, porém na mesma direção, às vezes a história é repleta de casos em que lideranças foram depostas e até mesmo mortas por terem seus discursos e gestos distorcidos justamente por sua essência ser um farol rumo ao progresso — que acaba sendo a escuridão aos que servem o mal, o qual, na política, pode ser entendido como o uso da dissimulação em detrimento do interesse público, tornando o povo refém de interesses promíscuos ao exercício da função pública.

Talvez apenas a educação seja capaz de construir uma nova relação entre poder e povo, em que a essência seja prevalente à forma. Contudo, o Brasil ainda convive com níveis preocupantes de analfabetismo funcional.

Por fim, o poder não é mal. O erro é ter o mal como companhia na essência dos gestos humanos.`,
  },
];

async function main() {
  for (const a of articles) {
    const art = await prisma.article.upsert({
      where: { slug: a.slug },
      update: {
        title: a.title,
        subject: a.subject,
        excerpt: a.excerpt,
        body: a.body,
        author: AUTHOR,
        coverImage: a.coverImage,
        publishedAt: new Date(a.publishedAt),
        status: "published",
      },
      create: {
        slug: a.slug,
        title: a.title,
        subject: a.subject,
        excerpt: a.excerpt,
        body: a.body,
        author: AUTHOR,
        coverImage: a.coverImage,
        publishedAt: new Date(a.publishedAt),
        status: "published",
      },
    });
    console.log("   ✔", art.slug);
  }
  console.log("✅ Três artigos publicados.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
