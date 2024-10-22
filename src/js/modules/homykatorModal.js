import { Fancybox } from "@fancyapps/ui";

function homyakatorModal() {
    const companyImage = document.getElementById('company-image');
    const HomasLink = document.getElementById('homas');

    
   
        [companyImage, HomasLink].forEach(function (elem) {
            elem.addEventListener('click', function (event) {
                event.preventDefault();

                Fancybox.show(
                    [
                        {
                            src: '/videos/homyakator-market.mp4',
                            caption: `A little bit about us`,
                        },
                        {
                            src: '/videos/Be-part-of-Homas.mp4',
                            caption: `Be part of Homas`,
                        },
                        {
                            src: '/videos/hamster-riding.mp4',
                            caption: `Homa got wheels!`,
                        },
                        {
                            src: '/videos/hamster-happy.mp4',
                            caption: `Spreading happiness, one squeak at a time`,
                        },
                        {
                            src: '/videos/hamster-pool.mp4',
                            caption: `Feast in the tub: Homyakator-style splash!`,
                        },
                        {
                            src: '/videos/another-hamster-riding.mp4',
                            caption: `Another homa on the move: never stop exploring`,
                        },
                        {
                            src: '/videos/hamsters-nsfw-reference.mp4',
                            caption: `Remember: moderation is key, even for Homas`,
                        }
                    ],
                );
        })
    
    
})

}


homyakatorModal()
