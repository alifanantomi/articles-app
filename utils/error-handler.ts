export class AuthError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export function handleAuthError(error: unknown) {
  if (error instanceof AuthError) {
    // Handle specific auth errors
    switch (error.code) {
      case '2FA_REQUIRED':
        return {
          error: 'Memerlukan verifikasi 2FA',
          requiresTwoFactor: true
        };
      case 'INVALID_2FA':
        return {
          error: 'Kode 2FA tidak valid',
          requiresTwoFactor: true
        };
      default:
        return {
          error: 'Terjadi kesalahan autentikasi'
        };
    }
  }
  
  // Handle unexpected errors
  console.error('Unexpected error:', error);
  return {
    error: 'Terjadi kesalahan sistem'
  };
}