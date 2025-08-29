# Keansburg Park — eProject Skeleton

> Repository khởi tạo cho nhóm 5 người: 2 (Template+Figma), 2 (ERD+DB), 1 (Manager).  
> Chuẩn bị đầy đủ **Document + SourceCode + Database** như yêu cầu eProject.

## Cấu trúc thư mục

```
/design/
  /references/      # link + ảnh template tham khảo
  /figma/           # PNG/PDF export + (tùy) .fig nhỏ
  /guidelines/      # palette, typography, spacing

/database/
  /erd/             # .drawio/.dbml + PNG/PDF
  /diagram/         # sơ đồ quan hệ 3NF
  /sql/             # 00_schema.sql (DDL), 01_seed.sql (tùy chọn)

/docs/              # design-guidelines.md, db-notes.md, biên bản, hướng dẫn
/src/               # prototype HTML/CSS/JS/React (nếu có)
```

## Quy ước nhánh & commit
- Nhánh: `design/<screen>`, `db/<topic>` (vd: `design/home`, `db/erd-v1`)
- Commit (Conventional): `feat(design): ...`, `feat(db): ...`, `docs: ...`, `fix: ...`

## Luồng làm việc (tóm tắt)
```
Issue → create branch → commit/push → Pull Request → Review/CI → Approve → Merge to main → Deploy
```

## Hướng dẫn xem Figma/ERD/SQL
- Link Figma (view-only): TODO
- ERD: xem PNG/PDF ở `/database/erd/`, file nguồn .drawio/.dbml kèm theo
- Import SQL:
  1. Mở MySQL
  2. Chạy `/database/sql/00_schema.sql`
  3. (Tùy chọn) `/database/sql/01_seed.sql`

## Tài liệu nhóm
- Design guideline: `/design/guidelines/design-guidelines.md`
- Ghi chú database: `/docs/db-notes.md`

---
Generated: 2025-08-28 07:40
