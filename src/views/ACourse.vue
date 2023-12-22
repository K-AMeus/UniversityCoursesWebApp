<template>
  <div class="A Course">
    <h3>{{ courseDetails.coursename }}</h3>
    <p>Course Code: {{ courseDetails.coursecode }}</p>
    <p>ECTS: {{ courseDetails.courseects }}</p>

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

</style>
