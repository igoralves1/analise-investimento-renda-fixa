import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3001
const DATA_DIR = path.join(__dirname, 'data')

app.use(cors())
app.use(express.json())

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR)

function readJSON(file) {
  const fp = path.join(DATA_DIR, file)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(fs.readFileSync(fp, 'utf-8'))
}

function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8')
}

// ── Parâmetros globais ────────────────────────────────────────────────────────
app.get('/api/parametros', (req, res) => {
  const data = readJSON('parametros.json') || {
    valor_investido: '',
    data_inicio: new Date().toISOString().slice(0, 10),
    data_fim_planejada: '',
    cdi_anual: 14.65,
    ipca_anual: 5.5,
    selic_anual: 14.5,
  }
  res.json(data)
})

app.post('/api/parametros', (req, res) => {
  writeJSON('parametros.json', req.body)
  res.json({ ok: true })
})

// ── Produtos ──────────────────────────────────────────────────────────────────
app.get('/api/produtos', (req, res) => {
  const data = readJSON('produtos.json') || { produtos: [] }
  res.json(data.produtos)
})

app.post('/api/produtos', (req, res) => {
  const data = readJSON('produtos.json') || { produtos: [] }
  const produto = { ...req.body, id: Date.now().toString() }
  data.produtos.push(produto)
  writeJSON('produtos.json', data)
  res.json(produto)
})

app.put('/api/produtos/:id', (req, res) => {
  const data = readJSON('produtos.json') || { produtos: [] }
  const idx = data.produtos.findIndex(p => p.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'Não encontrado' })
  data.produtos[idx] = { ...data.produtos[idx], ...req.body, id: req.params.id }
  writeJSON('produtos.json', data)
  res.json(data.produtos[idx])
})

app.delete('/api/produtos/:id', (req, res) => {
  const data = readJSON('produtos.json') || { produtos: [] }
  data.produtos = data.produtos.filter(p => p.id !== req.params.id)
  writeJSON('produtos.json', data)
  res.json({ ok: true })
})

app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`))
