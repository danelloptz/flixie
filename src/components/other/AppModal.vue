<template>
    <div v-if="visibility" class="modal_wrapper" id="modal_wrapper">
        <section class="modal">
            <img src="@/assets/images/close.png" class="close" @click="close">
            <h1>{{ title }}</h1>
            <span>{{ message }}</span>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        message: String,
        visibility: Boolean,
    },
    methods: {
        close() {
            if (this.visibility) {
                this.$emit('update:visibility', false);
            }
            this.$emit('close'); 
        }
    }
};
</script>


<style scoped>
    h3 {
        font-size: 18px;
    }
    h1, h2, span, img {
        z-index: 5;
    }
    .modal_wrapper {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 900;
        background: rgba(0, 0, 0, 0.422);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        width: 760px;
        height: 350px;
        border-radius: 10px;
        position: relative; /* Обеспечиваем позиционирование для псевдоэлемента */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 50px;
        z-index: 2;
        overflow-y: auto;
        scrollbar-width: none;
        /* row-gap: 20px; */
        box-sizing: border-box;
        margin-top: -50px;
        align-self: center;
        background: var(--second_bg);
        border-radius: 10px;
        @media (max-width: 1400px) {
            width: 80vw;
        }
        @media (max-width: 650px) {
            width: 90vw;
            padding: 30px 15px;
        }
    }

    .modal::-webkit-scrollbar {
        width: 0;  
        height: 0;
    }

    .modal::-webkit-scrollbar-thumb {
        background: transparent;
    }

    .close {
        position: absolute;
        right: 30px;
        top: 30px;
        width: 21px;
        height: 21px;
        cursor: pointer;
        @media (max-width: 450px) {
            right: 20px;
            top: 20px;
        }
    }

    h1 {
        font-size: var(--film_title);
        line-height: 62.4px;
        font-weight: 400;
        @media (max-width: 900px) {
            font-size: 35px;
        }
        @media (max-width: 500px) {
            font-size: 30px;
        }
    }
    span {
        font-size: 24px;
        font-weight: 400;
        line-height: 32.68px;
        text-wrap: wrap;
        text-align: center;
        @media (max-width: 900px) {
            font-size: 20px;
        }
        @media (max-width: 650px) {
            font-size: 17px;
        }
    }
</style>