CREATE TABLE "groups" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "is_common" INTEGER NOT NULL DEFAULT (0)
);

CREATE UNIQUE INDEX "group_name" on groups (name ASC);

CREATE TABLE "phrases" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "group_id" INTEGER NOT NULL,
    "phrase" TEXT NOT NULL,
    "parent_id" INTEGER  NOT NULL  DEFAULT (0),
    FOREIGN KEY(group_id) REFERENCES groups(id));

CREATE TABLE "content" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "phrase_id" INTEGER NOT NULL,
    "lang" TEXT NOT NULL DEFAULT ('en'),
    "content" TEXT NOT NULL DEFAULT ('(empty)'),
    "verified" INTEGER NOT NULL DEFAULT (0),
    FOREIGN KEY(phrase_id) REFERENCES phrases(id));

CREATE UNIQUE INDEX "phrase_lang_uniq_index" on content (phrase_id ASC, lang ASC);


