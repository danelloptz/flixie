<template>
  <transition name="modal">
    <section v-if="visibility" class="modal">
      <img src="@/assets/images/close.png" class="close" @click="close" />
      <h1>{{ title }}</h1>
      <span>{{ message }}</span>
    </section>
  </transition>
</template>


<script>
    export default {
        props: {
            title: String,
            message: String,
            visibility: Boolean,
        },

        data() {
            return {
            isVisible: false,
            isClosing: false,
            };
        },

        watch: {
            visibility(val) {
            if (val) {
                this.isVisible = true;
                this.isClosing = false;
            }
            },
        },

        methods: {
            close() {
                this.$emit("update:visibility", false);
                this.$emit("close");
            },
        },
    };

</script>


<style scoped>
    h3 {
        font-size: 18px;
        font-weight: normal;
    }
    h1, h2, span, img {
        z-index: 5;
    }

    .modal {
        width: 90vw;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 30px 10px;
        z-index: 999;
        background: var(--second_bg);
        position: fixed;
        top: -200px;
        animation: Show 0.5s ease-in forwards;
    }

    .modal.closing {
        animation: Hide 0.5s ease-out forwards;
    }

    @keyframes Show {
        from {
            top: -200px;
            opacity: 0;
        }
        to {
            top: 0px;
            opacity: 1;
        }
    }

    @keyframes Hide {
        from {
            top: 0px;
            opacity: 1;
        }
        to {
            top: -200px;
            opacity: 0;
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
        color: white;
        width: fit-content;
    }
    span {
        font-size: var( --main_text);
        text-wrap: wrap;
        /* text-align: center; */
        @media (max-width: 900px) {
            font-size: 20px;
        }
        @media (max-width: 650px) {
            font-size: 17px;
        }
    }

    .modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease;
}

.modal-enter-from {
  top: -200px;
  opacity: 0;
}

.modal-enter-to {
  top: 0;
  opacity: 1;
}

.modal-leave-from {
  top: 0;
  opacity: 1;
}

.modal-leave-to {
  top: -200px;
  opacity: 0;
}

</style>