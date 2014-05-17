<?php
/**
 * Define global variables - THEMEROOT and IMAGE.
 */
define('THEMEROOT', get_stylesheet_directory_uri());
define('IMAGE', get_stylesheet_directory_uri() . '/img');

/**
 * madslundt functions and definitions
 *
 * @package madslundt
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'madslundt_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function madslundt_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on madslundt, use a find and replace
	 * to change 'madslundt' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'madslundt', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	//add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'madslundt' ),
	) );

	// Enable support for Post Formats.
	add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link' ) );

	// Setup the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'madslundt_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Enable support for HTML5 markup.
	add_theme_support( 'html5', array(
		'comment-list',
		'search-form',
		'comment-form',
		'gallery',
		'caption',
	) );
}
endif; // madslundt_setup
add_action( 'after_setup_theme', 'madslundt_setup' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function madslundt_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'madslundt' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}
add_action( 'widgets_init', 'madslundt_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function madslundt_scripts() {
	//wp_enqueue_style( 'madslundt-style', get_stylesheet_uri() );

	wp_register_style( 'style', get_template_directory_uri() . '/less/style.css' );
	wp_enqueue_style('style');

	wp_deregister_script('jquery');
	wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js', false, '1.11.0', false);

	$bootstrap_scripts = array(
		'transition', //modal
		'alert',
		'button',
		//'carousel',
		'collapse', //search
		'dropdown', //menu
		'modal', 
		'scrollspy',
		//'tab',
		'tooltip',
		'popover'
		//'affix'
	);
	foreach($bootstrap_scripts as $bootscript) {
		wp_register_script( $bootscript, get_template_directory_uri() . '/js/bootstrap/'.$bootscript.'.js', array('jquery'), '3.1.1', true );
		wp_enqueue_script( $bootscript );
	}

	wp_register_script( 'custom-scripts', get_template_directory_uri() . '/js/custom-scripts.js', array('jquery'), '1.0', true );
	wp_enqueue_script( 'custom-scripts' );

	wp_enqueue_script( 'madslundt-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

	wp_enqueue_script( 'madslundt-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'madslundt_scripts' );

/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
