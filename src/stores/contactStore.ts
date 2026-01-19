import { create } from "zustand";
import emailjs from "@emailjs/browser";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type ContactStore = {
  form: FormState;
  loading: boolean;
  status: "" | "success" | "error";

  setField: (field: keyof FormState, value: string) => void;
  resetForm: () => void;
  sendEmail: () => Promise<void>;
};

export const useContactStore = create<ContactStore>((set, get) => ({
  form: {
    name: "",
    email: "",
    message: "",
  },

  loading: false,
  status: "",

  setField: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),

  resetForm: () =>
    set({
      form: { name: "", email: "", message: "" },
    }),

  sendEmail: async () => {
    const { form } = get();

    try {
      set({ loading: true, status: "" });

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString("vi-VN"),
        }
      );

      set({ status: "success" });
      get().resetForm();
    } catch (err) {
      console.error("EmailJS error:", err);
      set({ status: "error" });
    } finally {
      set({ loading: false });
      setTimeout(() => set({ status: "" }), 3000);
    }
  },
}));
