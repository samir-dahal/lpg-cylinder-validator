const { createApp, ref } = Vue;

createApp({
  setup()
  {
    const codeInput = ref("");
    const result = ref(null);
    const currentYearPlaceHolder = ref(moment().format("YY"));

    const quarters = {
      A: 0, // Jan-Mar
      B: 3, // Apr-Jun
      C: 6, // Jul-Sep
      D: 9  // Oct-Dec
    };

    function checkCode()
    {
      const raw = codeInput.value.trim().toUpperCase();
      const match = raw.match(/^([A-D])(\d{2})$/);

      if (!match)
      {
        result.value = null;
        return;
      }

      const quarter = match[1];
      const year = parseInt(match[2], 10);
      const month = quarters[quarter];

      const expiryYear = 2000 + year;
      const expiryDate = moment({ year: expiryYear, month: month })
        .add(2, 'months')
        .endOf('month');
      const now = moment();
      const duration = moment.duration(expiryDate.diff(now));

      const years = Math.floor(duration.asYears());
      const months = Math.floor(duration.asMonths() % 12);
      const days = Math.floor(duration.asDays() % 30);

      let status = "";
      let statusClass = "";

      if (expiryDate.isBefore(now))
      {
        status = "❌ Expired - Do Not Use";
        statusClass = "bg-red-100 text-red-800";
      } else if (duration.asMonths() < 6)
      {
        status = "⚠️ Warning - Close to Expiry";
        statusClass = "bg-yellow-100 text-yellow-800";
      } else
      {
        status = "✅ OK - Safe to Use";
        statusClass = "bg-green-100 text-green-800";
      }

      result.value = {
        input: raw,
        expiryDate: expiryDate.format("MMMM YYYY"),
        timeLeft: [
          years > 0 ? `${years}y` : '',
          months > 0 ? `${months}m` : '',
          days > 0 ? `${days}d` : ''
        ].filter(Boolean).join(' '),
        status,
        statusClass
      };
    }

    return {
      codeInput,
      result,
      currentYearPlaceHolder,
      checkCode
    };
  }
}).mount("#app");