const Percentage = ({ date }) => {
    const currentDate = new Date(date);
    const targetDate = new Date("2025-09-18");
    
    currentDate.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const timeDiff = targetDate.getTime() - currentDate.getTime();
    const totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let percentage;
    if (totalDays <= 0) {
        percentage = 100;
    } else {
        percentage = (1 / totalDays) * 100;
    }

    return (
        <div>
            {percentage.toFixed(20)}%
        </div>
    );
};

export default Percentage;
