$(()=> {
        console.log('js connected properly')

        const $addBtn = $('#add-btn')
        const $addModal = $('#add-modal')

        const modalSlide = () => {
                $addModal.css('display', 'block')
        }

        const modalHide = () => {
                $addModal.css('display', 'none')
        }

        $addBtn.on('mouseover', modalSlide)
        $('body').on('click', modalHide)
        
    })
