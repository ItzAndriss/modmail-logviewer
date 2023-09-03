tailwind.config = {
    theme: {
        extend: {
            colors: {
                'discord-100': '#313338',
                'discord-200': '#2b2d31',
                'discord-300': '#1e1f22',
                'muted': '#889ba2',
                'blurple': '#5865f2',
                'green': '#57f287',
                'yellow': '#fee75c',
                'red': '#ed4245',
                'fuchsia': '#eb459e'
            },
            margin: {
              '-10px': '-10px',
            }
        }
    }
}

$(document).ready(function(){
    var internal = false

    $("#internal_toggle").click(function(){
        internal = internal ? false : true
        load()
    })

    function load(){
        if(internal){
            $(".btn").addClass("block mr-0.5 bg-green")
            $(".btn").removeClass("mr-[1.3rem] bg-discord-100")
            $(".internal").addClass("block")
            $(".internal").removeClass("hidden")
        }else{
            $(".btn").removeClass("mr-0.5 bg-green")
            $(".btn").addClass("mr-[1.3rem] bg-discord-100")
            $(".internal").addClass("hidden")
            $(".internal").removeClass("block")
        }
    }

    $("#profile-button").click(function(){
        if($("#profile-menu").hasClass("opacity-0")){
            $("#profile-menu").addClass("transition ease-out duration-100 scale-95 transform opacity-0 scale-95")
            setTimeout(() => {
                $("#profile-menu").removeClass("transition ease-out duration-100 scale-95 transform opacity-0 scale-95")
                $("#profile-menu").addClass("transform opacity-100 scale-100")
            }, 75);
        }else{
            $("#profile-menu").addClass("transition ease-in duration-75 transform opacity-100 scale-100")
            setTimeout(() => {
                $("#profile-menu").removeClass("transition ease-in duration-75 transform opacity-100 scale-100")
                $("#profile-menu").addClass("transform opacity-0 scale-95")
            }, 75);
        }
    })

    var navbar1_items = $("#navbar1 a");
    
    navbar1_items.each(function() {
        let href = $(this).attr("href")
        if(window.location.pathname.indexOf(href) >= 0){
            $(this).attr("class", "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium")
            $(this).attr("aria-current", "page")
        }else{
            $(this).attr("class", "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium")
        }
    });

    var navbar2_items = $("#navbar2 a");
    
    navbar2_items.each(function() {
        let href = $(this).attr("href")
        if(window.location.pathname.indexOf(href) >= 0){
            $(this).attr("class", "bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium")
            $(this).attr("aria-current", "page")
        }else{
            $(this).attr("class", "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium")
        }
    });
    
    mobile_menu = false
    $("#mobile-menu-button").click(function(){
        console.log(mobile_menu)
        if(mobile_menu){
            mobile_menu = false
            $("#mobile-menu-button").html(`<span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>`)
          $("#mobile-menu").addClass(`hidden`)
        }else{
            mobile_menu = true
            $("#mobile-menu-button").html(`<span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>`)
            $("#mobile-menu").removeClass(`hidden`)
        }
    })
})