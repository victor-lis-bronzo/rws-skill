#!/usr/bin/env bash
# install.sh — Instala ou atualiza a skill RWS no Antigravity (global ou por projeto)
set -euo pipefail

SCOPE="${1:-global}"
TARGET_DIR="${2:-}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

if [ "$SCOPE" = "global" ]; then
    TARGET_ROOT="${HOME}/.gemini/config"
else
    if [ -z "$TARGET_DIR" ]; then
        TARGET_DIR="$(pwd)"
    fi
    TARGET_ROOT="${TARGET_DIR}/.agents"
fi

SKILLS_DIR="${TARGET_ROOT}/skills"

echo "==> Instalando RWS Skill no Antigravity (Escopo: ${SCOPE})..."
echo "    Destino: ${SKILLS_DIR}"

mkdir -p "${SKILLS_DIR}" "${TARGET_ROOT}/core" "${TARGET_ROOT}/templates"

# Copia core e templates para links relativos
cp -r "${REPO_ROOT}/core/"* "${TARGET_ROOT}/core/"
cp -r "${REPO_ROOT}/templates/"* "${TARGET_ROOT}/templates/"

# Instala a skill mestra 'rws'
mkdir -p "${SKILLS_DIR}/rws"
cp "${REPO_ROOT}/SKILL.md" "${SKILLS_DIR}/rws/SKILL.md"
cp -r "${REPO_ROOT}/core" "${SKILLS_DIR}/rws/"
cp -r "${REPO_ROOT}/templates" "${SKILLS_DIR}/rws/"
if [ -d "${REPO_ROOT}/bin" ]; then
    cp -r "${REPO_ROOT}/bin" "${SKILLS_DIR}/rws/"
fi

# Instala cada skill modular
SOURCE_SKILLS_DIR="${REPO_ROOT}/skills"
if [ ! -d "$SOURCE_SKILLS_DIR" ]; then
    SOURCE_SKILLS_DIR="${REPO_ROOT}/workflows"
fi

for dir in "${SOURCE_SKILLS_DIR}"/*; do
    if [ -d "$dir" ]; then
        name="$(basename "$dir")"
        if [ "$name" != "rws" ]; then
            mkdir -p "${SKILLS_DIR}/${name}"
            cp -r "$dir/"* "${SKILLS_DIR}/${name}/"
            echo "    [+] /${name}"
        fi
    fi
done

echo ""
echo "==> Sucesso! Skills instaladas em ${SKILLS_DIR}"
