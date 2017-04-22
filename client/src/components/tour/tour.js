import introJs from 'intro.js';
// import React from 'react';

const tour = introJs.introJs();

const unregisteredBuyers = [
  {
    intro: `
    <h2>Document Management System!</h2>
    <hr />
    <div>
     <strong>Reaction</strong> Commmerce is the 21st century e-commerce.<br />
     There have been many problems with e-commerce and evolving technologies,
     so we built one that not only reacts to change, but inspires it. <br />
     If you're looking to have the best experience, more control, or you just
     want to get lost in the world of shopping, <br />
     <strong>This is your final stop!</strong>
    </div>
    <hr />
    <h3>Do you wish to take a tour of our platform?</h3>
    `
  }, {
    element: '.brand-logo',
    intro: `
    <h2>Reactive Search</h2>
    <hr />
    <div>
      Experience the power of reactive search. Search results are displayed
      as you type.<br />
      <strong>Just click the icon and type in the search bar.</strong>
    </div>
    <hr />
    <h3>Do you wish to continue?</h3>
   `
  }
];

export default function startTour() {
  console.log(tour);
    tour.setOptions({
      showBullets: true,
      showProgress: true,
      scrollToElement: true,
      showStepNumbers: true,
      tooltipPosition: "auto",
      tooltipClass: "custom-intro",
      steps: unregisteredBuyers,
      nextLabel: "Sure",
      hidePrev: true,
      hideNext: true
    }).start();
};
