if(select("#sort-menu-icon")){
  select("#sort-menu-icon").addEventListener("click", () => {
    select(".comments-sort-menu").classList.toggle("hidden");
  });
  
  select("#embed-btn").addEventListener("click", () => {
    select(".embed-text").classList.toggle("hidden");
  });
  
  select("#share-btn").addEventListener("click", () => {
    select(".share-video").classList.toggle("hidden");
  });
  
  select("#report-btn").addEventListener("click", () => {
    select(".report-pop").classList.toggle("hidden");
  });
  
  select(".cansle-report").addEventListener("click", () => {
    select(".report-pop").classList.toggle("hidden");
  });
  
  select("#addto-btn").addEventListener("click", () => {
    select(".addto-pop").classList.toggle("hidden");
  });
  
  select("#cansle-addto").addEventListener("click", () => {
    select(".addto-pop").classList.toggle("hidden");
  });
  
  select(".create-playlist-btn").addEventListener("click", () => {
      select(".addto-pop").classList.toggle("hidden");
      select(".create-playlist-pop").classList.toggle("hidden");
    });
  
  select(".cansle-create-playlist").addEventListener("click", () => {
      select(".create-playlist-pop").classList.toggle("hidden");
    });
  
  select(".video-show-description").addEventListener("click", () => {
    if (select(".video-show-description").textContent.trim() === "Show more") {
      select(".watch-video-description").style.maxHeight = "100%";
      select(".video-show-description").textContent = "Show less";
    } else if (
      select(".video-show-description").textContent.trim() === "Show less"
    ) {
      select(".watch-video-description").style.maxHeight = "100px";
      select(".video-show-description").textContent = "Show more";
    }
  });
  

}

select(".upload-btn").addEventListener("click", () => {
  select(".upload--video").classList.toggle("hidden");
  select(".upload--video-form").classList.toggle("hidden");
});