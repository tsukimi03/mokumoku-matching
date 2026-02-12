import { createClient } from './supabase-browser'

/**
 * 現在のユーザーが管理者かどうかをチェックする
 */
export async function isAdmin(): Promise<boolean> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('user_id')
    .eq('user_id', user.id)
    .single()

  return !!adminUser
}

/**
 * 管理者でない場合はエラーを投げる
 */
export async function requireAdmin() {
  const admin = await isAdmin()
  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }
}
