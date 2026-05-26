import axios from 'axios';

// 1. Tạo instance Axios kết nối tới Spring Boot
const apiClient = axios.create({
    // Dùng baseURL tương đối để gọi đến các route Next.js (ví dụ: /api/...) trên cùng origin
    // Nếu bạn muốn gọi backend khác, thay bằng process.env.NEXT_PUBLIC_API_BASE_URL
    baseURL: '',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// 2. Tự động đính kèm Token vào Header trước khi gửi request
apiClient.interceptors.request.use(
    (config) => {
        // Kiểm tra xem mã chạy trên Browser hay Server (Cần thiết cho Next.js SSR)
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Xử lý tập trung dữ liệu và bắt lỗi trả về
apiClient.interceptors.response.use(
    (response) => {
        return response.data; // Trả thẳng data về, không cần bọc response.data ở component nữa
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;
            if (status === 401 && typeof window !== 'undefined') {
                console.warn("Token hết hạn. Đang đăng xuất...");
                localStorage.removeItem('accessToken');
                // Tùy chọn: Chuyển hướng về trang login nếu cần
                // window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;