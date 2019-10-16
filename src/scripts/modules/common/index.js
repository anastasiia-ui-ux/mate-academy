import './../../../styles/main.scss';
import {initSlider} from './modules/slider';

export function initScripts() {
	initSlider('.js_slider', {
		spaceBetween: 1,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});
}
