<template>
  <div class="course-container">
    <div class="course-header">
      {{ courseDetails.coursename }} - {{ courseDetails.coursecode }} - {{ courseDetails.courseects }} ECTS
    </div>
    <div class="course-detail">
      <label>Max Number of Students:</label>
      <div class="course-info">{{ courseDetails.studentsnumbers }}</div>
    </div>
    <div class="course-detail">
      <label>Number of Groups:</label>
      <div class="course-info">{{ courseDetails.groupsnumbers }}</div>
    </div>
    <div class="course-detail">
      <label>Course Description:</label>
      <div class="course-info">{{ courseDetails.description }}</div>
    </div>
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
