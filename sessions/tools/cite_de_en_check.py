"""Compare cite-key multisets DE vs EN per thesis file."""
import re
import sys
from collections import Counter

BASE = r"C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit"
CITE = re.compile(r"\\cite[a-zA-Z]*(?:\[[^\]]*\])?\{([^}]+)\}")
CHAPTERS = [
    "01_einleitung", "02_suchbaeume_grundlagen", "03_messsystem_prtart",
    "04_implementierung", "05_evaluation", "06_fazit",
]
APPENDICES = ["A_measurements", "B_code_structure", "C_glossary", "D_building_block_matrix",
              "E_architecture_decisions", "F_comparison_interfaces"]


def cite_keys(path: str) -> Counter[str]:
    counts: Counter[str] = Counter()
    with open(path, encoding="utf-8") as fh:
        for m in CITE.finditer(fh.read()):
            for raw in m.group(1).split(","):
                counts[raw.strip()] += 1
    return counts


def main() -> None:
    out: list[str] = []
    all_ok = True
    pairs = [(f"kapitel/de/{c}.tex", f"kapitel/en/{c}.tex", c) for c in CHAPTERS]
    pairs += [(f"anhang/de/{a}.tex", f"anhang/en/{a}.tex", f"anhang {a}") for a in APPENDICES]
    for de_rel, en_rel, name in pairs:
        de = cite_keys(f"{BASE}/{de_rel}")
        en = cite_keys(f"{BASE}/{en_rel}")
        if de == en:
            out.append(f"{name}: OK ({sum(de.values())} cites)")
        else:
            all_ok = False
            diff = {k: (de.get(k, 0), en.get(k, 0))
                    for k in set(de) | set(en) if de.get(k, 0) != en.get(k, 0)}
            out.append(f"{name}: DIFF {diff}")
    out.append("GESAMT: " + ("DE==EN" if all_ok else "DIFFERENZEN!"))
    sys.stdout.write("\n".join(out) + "\n")


if __name__ == "__main__":
    main()
