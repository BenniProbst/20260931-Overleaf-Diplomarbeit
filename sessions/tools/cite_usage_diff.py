"""Per-key cite usage: Ur-Fassung (tag 2026-06-29) vs. current 6-chapter structure."""
import glob
import os
import re
import sys

BASE = r"C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit"
SCRATCH = (
    r"C:/Users/benja/AppData/Local/Temp/claude/C--WINDOWS-system32/"
    r"680a2413-b796-4bfa-894a-145cc51bd941/scratchpad"
)

KEY_RE = re.compile(r"^@\w+\{([^,\s]+)\s*,", re.MULTILINE)
CITE_RE = re.compile(r"\\cite[a-zA-Z]*(?:\[[^\]]*\])?\{([^}]+)\}")

NEW_FILES = (
    glob.glob(os.path.join(BASE, "kapitel", "de", "0?_*.tex"))
    + glob.glob(os.path.join(BASE, "anhang", "de", "*.tex"))
    + glob.glob(os.path.join(BASE, "anhang", "de", "tabellen", "*.tex"))
)
# only the 6 chapters of the new structure; old 8er files still on disk must be excluded
NEW_CHAPTERS = {
    "01_einleitung", "02_suchbaeume_grundlagen", "03_messsystem_prtart",
    "04_implementierung", "05_evaluation", "06_fazit",
}
OLD_FILES = (
    glob.glob(os.path.join(SCRATCH, "urfassung", "kapitel", "*.tex"))
    + glob.glob(os.path.join(SCRATCH, "urfassung", "anhang", "*.tex"))
)


def count_cites(paths: list[str]) -> dict[str, int]:
    counts: dict[str, int] = {}
    for path in paths:
        stem = os.path.splitext(os.path.basename(path))[0]
        if os.sep + "kapitel" in path or "/kapitel" in path:
            if stem not in NEW_CHAPTERS and "urfassung" not in path:
                continue
        try:
            with open(path, encoding="utf-8") as fh:
                text = fh.read()
        except OSError:
            continue
        for m in CITE_RE.finditer(text):
            for raw_key in m.group(1).split(","):
                key = raw_key.strip()
                if key:
                    counts[key] = counts.get(key, 0) + 1
    return counts


def main() -> None:
    with open(os.path.join(BASE, "literatur.bib"), encoding="utf-8") as fh:
        bib_keys = set(KEY_RE.findall(fh.read()))
    old_counts = count_cites(OLD_FILES)
    new_counts = count_cites(NEW_FILES)
    lost: list[str] = []
    thinned: list[str] = []
    gained: list[str] = []
    unused_both: list[str] = []
    for key in sorted(bib_keys):
        o = old_counts.get(key, 0)
        n = new_counts.get(key, 0)
        if o > 0 and n == 0:
            lost.append(f"{key}: {o} -> 0")
        elif 0 < n < o:
            thinned.append(f"{key}: {o} -> {n}")
        elif n > o:
            gained.append(f"{key}: {o} -> {n}")
        elif o == 0 and n == 0:
            unused_both.append(key)
    ghost_new = sorted(k for k in new_counts if k not in bib_keys)
    out: list[str] = []
    out.append(f"bib keys: {len(bib_keys)} | cited old: "
               f"{sum(1 for k in bib_keys if old_counts.get(k, 0) > 0)} | cited new: "
               f"{sum(1 for k in bib_keys if new_counts.get(k, 0) > 0)}")
    out.append(f"=== LOST (old>0, new=0): {len(lost)} ===")
    out.extend(lost)
    out.append(f"=== THINNED (new<old): {len(thinned)} ===")
    out.extend(thinned)
    out.append(f"=== GAINED (new>old): {len(gained)} ===")
    out.extend(gained)
    out.append(f"=== UNUSED in both: {len(unused_both)} ===")
    out.append(", ".join(unused_both))
    out.append(f"=== cited but not in bib (new): {len(ghost_new)} ===")
    out.append(", ".join(ghost_new))
    sys.stdout.write("\n".join(out) + "\n")


if __name__ == "__main__":
    main()
