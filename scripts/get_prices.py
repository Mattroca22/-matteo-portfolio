"""
Fetch basic-basket style product prices from Datos Abiertos Colombia (Socrata API),
aggregate by product, and write JSON for the Vite/React public folder.

The portal publishes this series as *Historico de Precios Productos de la Canasta
Familiar RAP Eje Cafetero* (resource id ``gdqq-rry2``). Override with env
``SOCRATA_DATASET_ID`` if you switch to another Socrata view.
"""

from __future__ import annotations

import json
import os
import ssl
import urllib.error
import urllib.parse
import urllib.request
from io import StringIO
from pathlib import Path

import pandas as pd

SOCRATA_DOMAIN = "www.datos.gov.co"
# Canasta familiar / RAP Eje Cafetero — historic product prices (Socrata catalog).
DEFAULT_DATASET_ID = "gdqq-rry2"
DEFAULT_PRODUCT_COL = "productos"
DEFAULT_PRICE_COL = "precio_medio"


def _fetch_socrata_json(url: str, timeout: int = 120) -> str:
    """GET JSON from Socrata; relaxes TLS verification for some Windows setups."""
    ctx = ssl.create_default_context()
    try:
        with urllib.request.urlopen(url, timeout=timeout, context=None) as resp:
            return resp.read().decode("utf-8")
    except ssl.SSLError:
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        with urllib.request.urlopen(url, timeout=timeout, context=ctx) as resp:
            return resp.read().decode("utf-8")


def _build_resource_url(dataset_id: str, limit: int, order: str) -> str:
    params = urllib.parse.urlencode(
        {"$limit": str(limit), "$order": order},
        safe="$:",
    )
    return f"https://{SOCRATA_DOMAIN}/resource/{dataset_id}.json?{params}"


def _resolve_column(df: pd.DataFrame, env_name: str, default: str) -> str:
    explicit = os.environ.get(env_name)
    if explicit and explicit in df.columns:
        return explicit
    if explicit:
        raise ValueError(f"{env_name}={explicit!r} not found in columns: {list(df.columns)}")
    if default in df.columns:
        return default
    lower_map = {c.lower(): c for c in df.columns}
    if default.lower() in lower_map:
        return lower_map[default.lower()]
    raise ValueError(
        f"Could not resolve column for {env_name}; got columns {list(df.columns)}. "
        f"Set {env_name} to an existing column name."
    )


def main() -> None:
    dataset_id = os.environ.get("SOCRATA_DATASET_ID", DEFAULT_DATASET_ID)
    limit = int(os.environ.get("SOCRATA_LIMIT", "500"))
    order = os.environ.get("SOCRATA_ORDER", ":id DESC")

    url = _build_resource_url(dataset_id, limit=limit, order=order)
    try:
        raw = _fetch_socrata_json(url)
    except urllib.error.HTTPError as e:
        raise SystemExit(f"Socrata request failed ({e.code}): {e.reason}. URL: {url}") from e

    df = pd.read_json(StringIO(raw))
    if df.empty:
        raise SystemExit("Socrata returned zero rows; check dataset id and filters.")

    product_col = _resolve_column(df, "SOCRATA_PRODUCT_COL", DEFAULT_PRODUCT_COL)
    price_col = _resolve_column(df, "SOCRATA_PRICE_COL", DEFAULT_PRICE_COL)

    print(f"Fetched {len(df)} rows from Socrata (dataset {dataset_id!r}).")

    work = df[[product_col, price_col]].copy()
    work = work.rename(columns={product_col: "Producto", price_col: "Precio"})
    work["Precio"] = pd.to_numeric(work["Precio"], errors="coerce")
    work = work.dropna(subset=["Producto", "Precio"])

    grouped = (
        work.groupby("Producto", as_index=False)["Precio"]
        .mean()
        .rename(columns={"Precio": "precio_promedio"})
        .sort_values("Producto")
        .reset_index(drop=True)
    )

    repo_root = Path(__file__).resolve().parents[1]
    out_path = repo_root / "public" / "data_prices.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)

    payload = json.loads(grouped.to_json(orient="records", force_ascii=False))
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {len(grouped)} rows to {out_path}")


if __name__ == "__main__":
    main()
