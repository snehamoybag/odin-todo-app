export default {
  todos: [
    {
      title: "do something",
      description: "do anything",
      dueDate: {
        day: 10,
        month: 11,
        year: 2023,
      },
      notes: [
        {
          title: "well boi",
          description: "hello world i have nothing to do",
        },
      ],
      priority: "low",
      inProject: "abstract",
    },
    {
      title: "do something good",
      description: "do better stuffs",
      dueDate: {
        day: 20,
        month: 11,
        year: 2023,
      },
      notes: [
        {
          title: "well hi",
          description: "hello world i have something better to do",
        },
      ],
      priority: "medium",
      inProject: "abstract",
    },
    {
      title: "do coding",
      description: "finish todo app",
      dueDate: {
        day: 30,
        month: 10,
        year: 2023,
      },
      notes: [
        {
          title: "follow the solid principles",
          description: "",
        },
        {
          title: "if stuck",
          description: "use google or chat gpt",
        },
      ],
      priority: "high",
      inProject: "coding",
    },
    {
      title: "do nothing",
      description: null,
      dueDate: {
        day: 1,
        month: 11,
        year: 2023,
      },
      notes: [],
      priority: null,
      inProject: null,
    },
  ],
};
