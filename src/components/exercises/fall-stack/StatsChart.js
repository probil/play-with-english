import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: ['stats'],
  mounted() {
    this.renderChart({
      labels: ['Correct', 'Incorrect', 'Unanswered'],
      datasets: [
        {
          label: 'Statistics',
          backgroundColor: [
            '#36A2EB',
            '#FF6384',
            'rgba(105, 106, 119, 0.6)',
          ],
          data: [
            this.stats.correct,
            this.stats.incorrect,
            this.stats.unanswered || 0,
          ],
        },
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
        labels: {
          fontColor: '#fff',
          fontSize: 16,
          padding: 30,
          boxWidth: 30,
        },
      },
    });
  },
};
