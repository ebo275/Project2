$(()=> {
        console.log('js connected properly')

        const $addBtn = $('#add-btn')
        const $addModal = $('#add-modal')

        const modalSlide = () => {
                $addModal.css('display', 'flex')
        }

        const modalHide = () => {
                $addModal.css('display', 'none')
        }

        $addBtn.mouseover(modalSlide)
        
    })
    