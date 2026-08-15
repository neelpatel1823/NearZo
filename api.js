const API_BASE = '/api';

async function fetchApi(endpoint, options = {}) {
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(!isFormData && { 'Content-Type': 'application/json' }),
    ...options.headers
  };
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers,
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}

export const productApi = {
  getAll: () => fetchApi('/products'),
  getById: (id) => fetchApi(`/products/${id}`),
  create: (formData) => fetchApi('/products', {
    method: 'POST',
    body: formData instanceof FormData ? formData : JSON.stringify(formData),
    headers: formData instanceof FormData ? {} : { 'Content-Type': 'application/json' }
  }),
  update: (id, data) => fetchApi(`/products/${id}`, {
    method: 'PUT',
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' }
  }),
  delete: (id) => fetchApi(`/products/${id}`, { method: 'DELETE' })
}; // ./uploads/images multer file upload 
