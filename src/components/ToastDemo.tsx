import React from "react";
import { toast } from "react-toastify";
import { Sun, Moon } from "lucide-react";

interface Props {
  theme: string;
  toggleTheme: () => void;
}

const ToastDemo: React.FC<Props> = ({ theme, toggleTheme }) => {
  // 🟢 Toast cơ bản
  const showAllToasts = () => {
    toast("Đây là thông báo mặc định 💬");
    toast.success("Thành công! Dữ liệu đã được lưu ✅");
    toast.error("Lỗi rồi! Hãy thử lại ❌");
    toast.info("Thông tin hệ thống đã cập nhật ℹ️");
    toast.warn("Cảnh báo! Kiểm tra lại ⚠️");

    const id = toast.loading("Đang xử lý dữ liệu ⏳");
    setTimeout(() => {
      toast.update(id, {
        render: "Hoàn tất xử lý 🎯",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    }, 2500);

    toast("Tùy chỉnh với icon 🧠", {
      icon: "🧠",
      style: {
        background: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      },
    });
  };

  // 🟡 Toast có nút
  const showConfirmToast = () => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p className="font-medium text-sm">
            Bạn có chắc muốn xóa mục này không?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                toast.success("Đã xóa thành công ✅");
                closeToast();
              }}
              className="px-3 py-1 bg-error text-white rounded-md text-sm"
            >
              Xóa
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        className: "p-4",
      }
    );
  };

  // 🔵 Toast Stack
  const showStackedToasts = () => {
    toast.info("Thông báo Stack 1 🧩", { autoClose: false });
    toast.success("Thông báo Stack 2 ✅", { autoClose: false });
    toast.warning("Thông báo Stack 3 ⚠️", { autoClose: false });
    toast.error("Thông báo Stack 4 ❌", { autoClose: false });
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-12">
      <button
        onClick={() => {
          toggleTheme();
          toast.success(
            `Đã chuyển sang ${theme === "dark" ? "Light" : "Dark"} mode 🌗`
          );
        }}
        className="px-6 py-3 flex items-center gap-2 bg-primary text-white font-medium rounded-xl shadow hover:bg-primary-deep transition-all duration-200"
      >
        {theme === "dark" ? (
          <>
            <Sun size={18} /> Light Mode
          </>
        ) : (
          <>
            <Moon size={18} /> Dark Mode
          </>
        )}
      </button>

      <button
        onClick={showAllToasts}
        className="px-6 py-3 flex items-center gap-2 bg-success text-white font-medium rounded-xl shadow hover:bg-success/90 transition-all duration-200"
      >
        🚀 Hiện tất cả Toasts
      </button>

      <button
        onClick={showConfirmToast}
        className="px-6 py-3 flex items-center gap-2 bg-warning text-white font-medium rounded-xl shadow hover:bg-warning/90 transition-all duration-200"
      >
        🧩 Hiện Toast có nút
      </button>

      <button
        onClick={showStackedToasts}
        className="px-6 py-3 flex items-center gap-2 bg-info text-white font-medium rounded-xl shadow hover:bg-info/90 transition-all duration-200"
      >
        📚 Hiện Toast Stack
      </button>
    </div>
  );
};

export default ToastDemo;
