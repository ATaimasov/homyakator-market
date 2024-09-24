import { Fancybox } from "@fancyapps/ui";

function homyakator() {
    const $companyImage = document.getElementById('company-image');

    if ($companyImage) {

        $companyImage.addEventListener('click', function (event) {

            event.preventDefault();

            Fancybox.show(
                
                [
                    {
                        src: '/videos/hamster-riding.mp4',
                        caption: `Homa's got wheels!`,
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
                        caption: `Another homas on the move: never stop exploring`,
                    },
                    {
                        src: '/videos/hamsters-nsfw-reference.mp4',
                        caption: `Remember: moderation is key, even for Homas`,
                    }
                ],
            );
        })
    }
    
}


homyakator()