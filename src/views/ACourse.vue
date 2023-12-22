<template>
  <div class="course-container">
    <form @submit.prevent="updateCourseDetails">
      <div class="course-header">
        {{ courseDetails.coursename }} - {{ courseDetails.coursecode }} - {{ courseDetails.courseects }} ECTS
      </div>
      <div class="course-detail">
        <label>Max Number of Students:</label>
        <input type="number" v-model="courseDetails.studentsnumbers">
      </div>
      <div class="course-detail">
        <label>Number of Groups:</label>
        <input type="number" v-model="courseDetails.groupsnumbers">
      </div>
      <div class="course-detail">
        <label>Course Description:</label>
        <textarea v-model="courseDetails.description"></textarea>
      </div>
      <button type="button" :disabled="exceedsGroupLimit" @click="updateCourseDetails">Update Course</button>
    </form>
  </div>
</template>


<script>
export default {
  name: "ACourse",
  data() {
    return {
      courseDetails: {}
    };
  },
  computed: {
    exceedsGroupLimit() {
      return this.courseDetails.studentsnumbers > this.courseDetails.groupsnumbers * 30;
    }
  },
  methods: {
    async fetchCourseData() {
      const courseId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          this.courseDetails = data;
        } else {
          console.error('Error fetching course data:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },

    async updateCourseDetails() {
      const courseId = this.$route.params.id;
      try {
        const response = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.courseDetails)
        });
        if (response.ok) {
          alert('Course updated successfully');
          this.$router.push('/Courses'); 
        } else {
          console.error('Error updating course:', response.status);
        }
      } catch (error) {
        console.error('Error updating course:', error);
      }
    }
  },
  mounted() {
    this.fetchCourseData();
  }
};
</script>

<style scoped>
.course-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.course-header {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: left;
}

.course-detail {
  margin-bottom: 15px;
}

.course-detail label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
  text-align: left;
}

.course-info {
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  line-height: 1.6;
}

.centered {
  text-align: center;
}
</style>
