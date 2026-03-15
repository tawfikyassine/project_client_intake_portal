import { logout } from '@/app/(auth)/actions';

export async function POST() {
  return await logout();
}
