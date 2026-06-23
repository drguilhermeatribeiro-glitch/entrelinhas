"use client";

import { Trash2 } from "lucide-react";

/**
 * Botão de exclusão que pede confirmação. Deve ser usado dentro de um
 * <form action={deleteAction}> contendo um <input type="hidden" name="id">.
 */
export function DeleteButton({
  label = "Excluir",
  message = "Tem certeza que deseja excluir? Esta ação não pode ser desfeita.",
  compact = false,
}: {
  label?: string;
  message?: string;
  compact?: boolean;
}) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      className={
        compact
          ? "inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400 cursor-pointer"
          : "inline-flex items-center gap-2 rounded-full border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-500/10 dark:border-red-900 dark:text-red-400 cursor-pointer"
      }
    >
      <Trash2 className="h-4 w-4" /> {label}
    </button>
  );
}
