import { motion } from "framer-motion";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  children?: React.ReactNode; // Allow children
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="w-full max-w-md rounded-lg bg-white/10 p-6 backdrop-blur-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
        <p className="mb-6 text-white/70">{message}</p>

        {/* Render any children passed (inputs, etc.) */}
        {children}

        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-[#9560EB] px-4 py-2 text-white hover:bg-[#6B46C1]"
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
