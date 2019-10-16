import Swiper from 'swiper';

/**
 * @param {string} selector - slick slider selector
 * @param {object} options - slider config
 **/

export function initSlider(selector, options) {
	new Swiper(selector, options);
}