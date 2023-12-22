<template>
  <div>
    <h3> Courses </h3>
    <div class="container">
      <div v-for="course in courses" :key="course.id" class="course-row">
        <div class="course-column">
          <div class="column-title">Course name:</div>
          <div>{{ course.coursename }}</div>
        </div>
        <div class="course-column">
          <div class="column-title">Code:</div>
          <router-link :to="{ name: 'ACourse', params: { id: course.id } }">
            {{ course.coursecode }}
          </router-link>
        </div>
        <div class="course-column">
          <div class="column-title">ECTS:</div>
          <div>{{ course.courseects }}</div>
        </div>
        <div class="course-column">
          <div class="column-title">Max No. of students:</div>
          <div>{{ course.studentsnumbers }}</div>
        </div>
        <div class="course-column">
          <div class="column-title">No. of groups:</div>
          <div>{{ course.groupsnumbers }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Courses",
  data() {
    return {
      courses: [],
    };
  },
  methods: {
    fetchRecords() {
      fetch(`http://localhost:3000/api/courses`)
        .then((response) => response.json())
        .then((data) => (this.courses = data))
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.fetchRecords();
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}

.container {
  margin: auto;
  width: 90%;
}

.course-row {
  background: #6073b3;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.course-column {
  flex: 1;
  padding: 5px;
  font-size: 15px;
  color: black;
  text-align: center;
}

.column-title {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
