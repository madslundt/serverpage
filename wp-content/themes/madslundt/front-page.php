<?php get_header(); ?>
<div class="container">
	<div class="row">
		<?php
			$arr = array('SABnzbd', 'CouchPotato', 'SickBeard');
		?>
		<?php foreach ($arr as $a): ?>
		<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="thumbnail<?php echo ' ' . strtolower($a); ?>">
				<a href="#" class="pull-right js-update"><i class="glyphicon glyphicon-refresh greyout"></i></a>
				<!--<div class="loading"></div>-->
				<a href="#"><img src="<?php print IMAGE; ?>/<?php echo strtolower($a); ?>.png"/></a>
				<div class="caption" id="<?php echo strtolower($a); ?>">
					<h3><?php echo $a; ?></h3>
					<div class="data">
						<center><img alt="Loading..." src="<?php print IMAGE; ?>/ml_load.gif" height="64" width="64" /></center>
					</div>
				</div>
			</div>
		</div>

		<?php endforeach; ?>
	</div>
</div>
<?php
	$translation_array = array(
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'loadmore' => __('Load more...', 'madslundt')
		//'token' => wp_create_nonce(self::TOKEN_PREFIX),
	);
	wp_localize_script( 'custom-scripts', 'wp', $translation_array );
?>
<?php get_footer(); ?>