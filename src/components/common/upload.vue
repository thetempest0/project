<template>
  <div class='upload-container'>
    <section class='operation-container'>
      <form ref='form'>
        <input type="file" style="display:none" accept="image/*" multiple="multiple" @change="fileChange"
               ref='inputFile'/>
      </form>
      <button @click='btnUpload' ref='btnFile'>上传图片</button>
    </section>
    <section class='files-container'>
      <main class='file-container' v-for='file in files'>
        <span class='file-item'> 文件：{{file.name}}</span>
        <span class='file-item'> 大小：{{file.size}}</span>
        <button class='operation-item' @click='btnDelete(file)'>删除</button>
      </main>
    </section>
  </div>
</template>
<script>
  const uuidV1 = require('uuid/v1')
  export default {
    components: {},
    props: {},
    data () {
      return {
        test: '',
        files: [],
        addImageList: [],
        delImageList: []
      }
    },
    methods: {
      btnUpload () {
        this.$refs.inputFile.click()
      },
      fileChange () {
        const files = Array.from(this.$refs.inputFile.files)
        for (let file of files) {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            if (this.files.length > 24) {
              alert('文件数量不得超过25')
              return
            }
            let item = {data: e.target.result, name: file.name, size: file.size, type: file.type, id: uuidV1()}
            item.data = item.data.substr(item.data.indexOf(',') + 1)
            this.files.push(item)
            this.addImageList.push(item)
          }
        }
        this.$refs.form.reset()
      },
      btnDelete (file) {
        let index = -1
        for (let item of this.addImageList) {
          console.log(`file.id=${file.id} item.id=${item.id}`)
          // 如果当前要删除图片在添加列表中，从添加列表中删除这个图片，否则将其添加到删除列表中
          if (file.id === item.id) {
            index = this.addImageList.findIndex(listItem => listItem.id === file.id)
          }
        }
        if (index !== -1) {
          this.addImageList.splice(index, 1)
        } else {
          this.delImageList.push(file)
        }
        // 从当前页面中删除，显示
        index = this.files.findIndex(item => item.id === file.id)
        if (index !== -1) {
          this.files.splice(index, 1)
        }
      },
      // 获取组件当前图片
      getFiles () {
        return this.files
      },
      // 设置图片
      setFiles (files) {
        this.files.splice(0, this.files.length)
        for (let file of files) {
          this.files.push(file)
        }
      },
      // 获取增加的图片
      getAddFiles () {
        return this.addImageList
      },
      // 获取删除的图片
      getDelFiles () {
        return this.delImageList
      },
      reset () {
        this.files.splice(0, this.files.length)
        this.addImageList.splice(0, this.addImageList.length)
        this.delImageList.splice(0, this.delImageList.length)
      }
    }
  }
</script>
<style scoped lang="scss">
  .upload-container {
    width: 100%;
    display: flex;
  }

  .operation-container {
    flex: 20%;
    margin: 0.3rem;
    min-width: 10rem;
    flex-direction: column;
    display: flex;
  }

  .files-container {
    flex: 80%;
    margin: 0.3rem;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .file-container {
    width: 100%;
    margin: 0.3rem;
    display: flex;
    align-items: center;
  }

  .file-item {
    margin: 0.5rem 1rem;
  }

  .operation-item {
    margin: 0.5rem 1rem;
  }
</style>
