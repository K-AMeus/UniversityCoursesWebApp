<template>
  <div>
<h3> Courses </h3>
    <div class="container">
      <table>
          <tr>
            <th>Course name</th>
            <th>code</th>
            <th>ECTS</th>
            <th>Max No. of students</th>
            <th>No. of groups:</th>
            <th>description</th>
          </tr>
          <tr class="item" v-for="course in courses" :key="course.id">
            <td>{{ course.coursename }} </td>
            <td>
            <router-link :to="{ name: 'ACourse', params: { id: course.id }}">
              {{ course.coursecode }}
            </router-link>
            </td>
            <td>{{ course.courseects }} </td>
            <td>{{ course.studentsnumbers }} </td> 
            <td>{{ course.groupsnumbers }}</td>
            <td :class="{'low-grade': course.groupsnumbers < 21, 'high-grade': course.groupsnumbers >= 21}">{{ course.groupsnumbers }}</td>
            <td :class="{'low-grade': (course.groupsnumbers + course.groupsnumbers) < 51, 'high-grade': (course.groupsnumbers + course.groupsunmbers) >= 51}">{{ course.exam + course.homeworks }}</td>

          </tr>
    </table>
    </div>
  </div>
</template>

<script>

export default {
  name: "Courses",
    components: {

    },
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
    console.log("mounted");
  } 
};
</script>

<style scoped>

h3 {
  text-align: center;
  color: rgb(8, 110, 110);
}

h1 {
  font-size: 20px;
}
th {
  background: rgb(22, 161, 45);
}
td {
  background: rgb(228, 192, 186);
}
th, td {
  font-size: 15px;
  margin-bottom: 5px;
  padding: 8px 10px;
}

.container {
  background: #d5d7d8;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  padding: 10px 20px;
  margin: auto;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
