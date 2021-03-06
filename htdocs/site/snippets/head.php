<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<?php if ($page->isHomePage()): ?>
	<title><?= $site->title() ?></title>
	<?php else: ?>
	<title><?= $site->title() ?> | <?= $page->title() ?></title>
	<?php endif ?>

	<?= css('/assets/bundle.css') ?>
	<?= css('/assets/style.css') ?>
  <?= js('/assets/main.js', ['defer' => true]) ?>
</head>
<body class="mx-4">
<?php snippet('header') ?>
