
import {addClass, removeClass} from './../common/modules/toggleClass';
import dompurify from 'dompurify';

export const isItScrollable = (el) => {
  if (el === null) return false;
  let isScrollable = el.scrollHeight > el.offsetHeight;
  let hasScrollbars = false;
  if (isScrollable) {
    hasScrollbars = el.offsetWidth > el.scrollWidth;
  }
  return isScrollable && !hasScrollbars;
};

export const elementInViewport = (el) => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
};

export const scrollTop = () => {
  const startScrollPosition = 0;
  const animItaration = 5;
  (function smoothscroll(){
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > startScrollPosition) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(startScrollPosition,currentScroll - (currentScroll/animItaration));
    }
  })();  
};

export const hightlightWarn = (elem) =>{
  removeClass(elem,'success');
  removeClass(elem,'pending');
  addClass(elem,'error');
  setTimeout(()=>{
    removeClass(elem,'error');
  },3000);
};

export const replaceXss = (str) => {
  return dompurify.sanitize(str).replace(/\+/gi, ' ').replace(/\?/,'');
};

export function requestStart(){
  if(this.pending !== undefined) this.pending = true;
  if(this.loadMore !== undefined) this.loadMore.style.display = 'block'; 
  addClass(this.submitBtn,'pending');
}

export function requestEnd(){
  if(this.pending !== undefined) this.pending = false;
  if(this.loadMore !== undefined) this.loadMore.style.display = 'none';  
  removeClass(this.submitBtn,'pending');
}