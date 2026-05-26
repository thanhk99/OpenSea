"use client"; 

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/config/axios'; 

export default function LoginPage() {
    const router = useRouter();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // ĐÃ ĐỔI: Gọi chính xác đến endpoint /login-password của Backend
            const response: any = await apiClient.post('/api/auth/login-password', {
                username: username,
                password: password
            });

            // Nếu Backend trả về AuthResponse chứa token
            if (response && response.token) {
                localStorage.setItem('accessToken', response.token);
                alert('Đăng nhập thành công!');
                router.push('/'); // Điều hướng về trang chủ
            } else {
                setError('Hệ thống không phản hồi mã định danh xác thực.');
            }
        } catch (err: any) {
            console.error("Lỗi đăng nhập:", err);
            setError(err.response?.data?.message || 'Tài khoản hoặc mật khẩu không chính xác.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>CỔNG ĐĂNG NHẬP</h2>
                
                {error && <p style={styles.errorAlert}>{error}</p>}

                <form onSubmit={handleLoginSubmit} style={styles.formLayout}>
                    <div style={styles.inputWrapper}>
                        <label style={styles.fieldLabel}>Tài khoản (Username):</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                            style={styles.formInput}
                            placeholder="Nhập tên tài khoản..."
                        />
                    </div>

                    <div style={styles.inputWrapper}>
                        <label style={styles.fieldLabel}>Mật khẩu:</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                            style={styles.formInput}
                            placeholder="Nhập mật khẩu..."
                        />
                    </div>

                    <button type="submit" disabled={loading} style={styles.submitBtn}>
                        {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
                    </button>
                </form>

                <div style={styles.footerLink}>
                    <p>Chưa có tài khoản? <a href="/register" style={styles.link}>Đăng ký ngay tại đây</a></p>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#0d1117', color: '#fff' },
    card: { width: '100%', maxWidth: '420px', padding: '40px 30px', borderRadius: '12px', backgroundColor: '#161b22', border: '1px solid #30363d', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' },
    title: { textAlign: 'center' as const, marginBottom: '25px', color: '#58a6ff', fontSize: '24px' },
    formLayout: { display: 'flex', flexDirection: 'column' as const, gap: '20px' },
    inputWrapper: { display: 'flex', flexDirection: 'column' as const, gap: '6px' },
    fieldLabel: { fontSize: '14px', color: '#8b949e' },
    formInput: { padding: '12px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#21262d', color: '#c9d1d9', fontSize: '15px', outline: 'none' },
    submitBtn: { padding: '14px', borderRadius: '6px', border: 'none', backgroundColor: '#1f6feb', color: '#fff', fontSize: '16px', cursor: 'pointer', marginTop: '10px' },
    errorAlert: { color: '#f85149', backgroundColor: 'rgba(248,81,73,0.1)', padding: '12px', borderRadius: '6px', fontSize: '14px', textAlign: 'center' as const, border: '1px solid rgba(248,81,73,0.2)' },
    footerLink: { marginTop: '20px', textAlign: 'center' as const, fontSize: '14px', color: '#8b949e' },
    link: { color: '#58a6ff', textDecoration: 'none' }
};