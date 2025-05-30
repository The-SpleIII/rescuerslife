onMounted(() => {
  function cleanupOldRequests() {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    onValue(
      dbRef(database, "helpRequests"),
      (snapshot) => {
        if (!snapshot.exists()) return;

        const requests = snapshot.val();
        const updates = {};

        Object.keys(requests).forEach((key) => {
          const request = requests[key];
          const requestTime = new Date(request.createdAt);

          if (requestTime < oneDayAgo && request.status === "active") {
            update(dbRef(database, `helpRequests/${key}`), {
              status: "completed",
            });
          }
        });
      },
      { onlyOnce: true }
    );
  }

  cleanupOldRequests();

  const cleanupInterval = setInterval(cleanupOldRequests, 3600000);

  onUnmounted(() => {
    clearInterval(cleanupInterval);
  });
});
