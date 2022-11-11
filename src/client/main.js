const httpClient = new FetchHttpClient();
const baseUrl = 'http://localhost:3000';
const lancamentoService = new LancamentoService(httpClient);
new Tela(lancamentoService);

