import { isSupabaseConfigured, supabase } from './supabase'

function requireClient() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Add the required Vite environment variables.')
  }
  return supabase
}

export async function loadPortfolioContent() {
  const client = requireClient()
  const { data, error } = await client
    .from('portfolio_content')
    .select('*')
    .order('sort_order')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function savePortfolioContent(contentType, content, id) {
  const client = requireClient()
  const record = {
    ...(id ? { id } : {}),
    content_type: contentType,
    content,
    updated_at: new Date().toISOString(),
  }
  const { data, error } = await client
    .from('portfolio_content')
    .upsert(record)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deletePortfolioContent(id) {
  const client = requireClient()
  const { error } = await client.from('portfolio_content').delete().eq('id', id)
  if (error) throw error
}

export async function uploadPortfolioFile(file) {
  const client = requireClient()
  const extension = file.name.split('.').pop()?.toLowerCase() || 'file'
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await client.storage
    .from('portfolio-media')
    .upload(path, file, { upsert: false })

  if (error) throw error

  return client.storage.from('portfolio-media').getPublicUrl(path).data.publicUrl
}
