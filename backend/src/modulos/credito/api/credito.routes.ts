import { Router, Request, Response } from "express";
import { SupabaseAplicacionRepositorio } from "../infrastructure/repositories/supabaseAplicacionRepositorio";
import { SupabaseRiesgoRepositorio } from "../infrastructure/repositories/supabaseRiesgoRepositorio";
import { AprobacionCredito } from "../application/AprobacionCredito";

const router = Router();

const aplicacionRepo = new SupabaseAplicacionRepositorio();
const riesgoRepo = new SupabaseRiesgoRepositorio();

const aprobacionCredito = new AprobacionCredito(aplicacionRepo, riesgoRepo);