<template>
    hello world
    <div>
        <input style="width: 20px; height: 20px;" type="checkbox" name="" id="">Eu
        <br>
        <Checkbox :binary="true" v-model="v"/> Ele
    </div>
</template>

<script>
export default {

    data(){
        return{
            v: null
        }
    }
}
</script>