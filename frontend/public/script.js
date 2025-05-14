document.addEventListener("DOMContentLoaded", function () {

  // ==== SLIDE-IN ANIMATION ON SCROLL (for .slide-left and .slide-right elements) ====
  const slideElements = document.querySelectorAll('.slide-left, .slide-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running'; // Play animation when in view
        observer.unobserve(entry.target); // Stop observing once it's animated
      }
    });
  }, { threshold: 0.2 });

  slideElements.forEach(el => {
    el.style.animationPlayState = 'paused'; // Start with animation paused
    observer.observe(el); // Observe each element
  });

  // ==== AUTO SLIDESHOW IN DONATION SECTION ====
  let slideIndex = 0;
  function showSlides() {
    const slides = document.querySelectorAll(".donate-slider .slides");
    if (slides.length === 0) return;

    slides.forEach(slide => {
      slide.classList.remove("active"); // Hide all slides
    });

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1; // Loop to first slide

    slides[slideIndex - 1].classList.add("active"); // Show current slide
    setTimeout(showSlides, 3000); // Next slide every 3 seconds
  }
  showSlides();

  // ==== REVEAL ELEMENTS ON SCROLL (for elements with .reveal class) ====
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    reveals.forEach(reveal => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add("visible"); // Add visible class when scrolled into view
      }
    });
  };
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll); // Trigger reveal on load too

  // ==== IMAGE ZOOM MODAL ON CLICK (for .zoomable images) ====
  const images = document.querySelectorAll("img.zoomable");
  const modal = document.createElement("div");
  modal.classList.add("image-modal");
  modal.innerHTML = "<img src='' alt='zoomed image'>";
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  images.forEach(img => {
    img.addEventListener("click", () => {
      modalImg.src = img.src; // Set modal image to clicked image
      modal.classList.add("show"); // Show modal
    });
  });

  modal.addEventListener("click", () => {
    modal.classList.remove("show"); // Close modal on click outside
  });

  // ==== IMPACT COUNTERS (Animated numbers in .impact-stats-section) ====
  const counters = document.querySelectorAll(".counter");

 

  const impactSection = document.querySelector(".impact-stats-section");
  const observerCountUp = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(); // Start count when section is in view
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% visible

  if (impactSection) observerCountUp.observe(impactSection);

});



// ==== FULLSCREEN VIDEO FUNCTION ====
function openFullscreen(video) {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); // For Firefox
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // For Chrome, Safari, Opera
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen(); // For IE/Edge
  }
}

// ==== LOAD MORE VIDEOS ON "VIEW MORE" BUTTON CLICK ====
function loadMoreVideos() {
  const videoContainer = document.getElementById("video-container");

  // HTML template for additional videos (adjust width & styling as needed)
  const moreVideos = `
    <video width="360" controls onclick="openFullscreen(this)">
      <source src="videos/video4.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <video width="360" controls onclick="openFullscreen(this)">
      <source src="videos/video5.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <video width="360" controls onclick="openFullscreen(this)">
      <source src="videos/video6.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
     <video width="360" controls onclick="openFullscreen(this)">
        <source src="videos/video3.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video width="360" controls onclick="openFullscreen(this)">
        <source src="videos/video3.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video width="360" controls onclick="openFullscreen(this)">
        <source src="videos/video3.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video width="360" controls onclick="openFullscreen(this)">
        <source src="videos/video3.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video width="360" controls onclick="openFullscreen(this)">
        <source src="images/.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video width="360" controls onclick="openFullscreen(this)">
        <source src="images/.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video width="360" controls onclick="openFullscreen(this)">
        <source src="images/.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <video width="360" controls onclick="openFullscreen(this)">
        <source src="images/.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video> 
      <video width="360" controls onclick="openFullscreen(this)">
        <source src="images/.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video> 
  `;

  // Append new video elements to the container
  videoContainer.innerHTML += moreVideos;

  // Hide the button after loading more videos
  document.getElementById("view-more-videos").style.display = "none";
}

// ==== IMAGE MODAL (Fullscreen view for .zoomable images) ====
const images = document.querySelectorAll('.zoomable'); // Select zoomable images
const modal = document.getElementById('imageModal'); // Get modal
const modalImage = document.getElementById('modalImage'); // Modal image element

// Show modal with clicked image
images.forEach(image => {
  image.addEventListener('click', function () {
    modalImage.src = this.src;
    modal.style.display = 'flex';
  });
});

// Close modal on close button click
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', function () {
  modal.style.display = 'none';
});

// Close modal if clicked outside the image
window.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

function loadMoreImages() {
  // Display the hidden gallery without hiding the visible one
  const hiddenGallery = document.getElementById('hidden-gallery');
  const viewMoreButton = document.getElementById('view-more-images');

  // Make the hidden images visible
  hiddenGallery.style.display = 'flex';  

  // Hide the "View More" button once clicked (optional)
  viewMoreButton.style.display = 'none'; 
}


// ABOUT US FULL SCREEN IMAGE VIEW
  // Function to expand image
  function expandImage(element) {
    const popup = document.querySelector('.fullscreen-image-popup');
    const popupImg = document.getElementById('popup-img');
    const img = element.querySelector('img');

    popupImg.src = img.src;
    popup.style.display = 'flex';
  }

  // Function to close popup
  function closePopup() {
    const popup = document.querySelector('.fullscreen-image-popup');
    popup.style.display = 'none';
  }


// reveal impact images (gallery section)

  function showHiddenImages() {
    const hiddenImages = document.querySelectorAll('.hidden-image');
    hiddenImages.forEach(img => {
      img.style.display = "block"; // you can also use "inline-block" or "flex"
    });

    // Hide the button after revealing
    document.getElementById("viewMoreBtn").style.display = "none";
  }



// Function to animate the counter
function animateCounter(counter) {
  const target = +counter.getAttribute('data-target');
  let count = 0;
  const speed = 200; // Lower is faster

  const updateCount = () => {
    const increment = target / speed;
    if (count < target) {
      count += increment;
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCount); // Smooth animation
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
}

// Intersection Observer to detect when the section is in view
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        if (!counter.classList.contains('counted')) { // Ensure counting happens only once
          animateCounter(counter);
          counter.classList.add('counted'); // Mark as counted
        }
      });
      observer.disconnect(); // Run only once
    }
  });
}, { threshold: 0.5 }); // Trigger when 50% visible

// Observe the impact-stats-section
const section = document.querySelector('.impact-stats-section');
if (section) {
  observer.observe(section);
}
