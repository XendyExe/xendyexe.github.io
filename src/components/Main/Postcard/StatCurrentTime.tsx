import React, {
    useEffect,
    useState
} from "react";

const StatCurrentTime: React.FC = () => {
        const [timeString, setTimeString] = useState("");
        const [timeZoneAbbr, setTimeZoneAbbr] = useState("Loading...");
        const [utcOffset, setUtcOffset] = useState("");

        useEffect(() => {
            const updateTime = () => {
                const now = new Date();

                // Format the time in hh:mm:ss AM/PM
                const timeFormatter = new Intl.DateTimeFormat(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                });
                const formattedTime = timeFormatter.format(now);

                // Get time zone abbreviation (e.g., PST, PDT)
                const timeZoneFormatter = new Intl.DateTimeFormat(undefined, {
                    timeZoneName: "short",
                });
                const parts = timeZoneFormatter.formatToParts(now);
                const tzAbbr = parts.find((part) => part.type === "timeZoneName")?.value || "";

                // Get UTC offset in hours (e.g., -08:00)
                const offsetMinutes = now.getTimezoneOffset(); // in minutes, negative means ahead of UTC
                const offsetHours = -Math.floor(offsetMinutes / 60);
                const offsetLabel = `(UTC${offsetHours >= 0 ? "+" : ""}${offsetHours})`;

                setTimeString(formattedTime);
                setTimeZoneAbbr(tzAbbr);
                setUtcOffset(offsetLabel);
            };

            updateTime();
            const interval = setInterval(updateTime, 1000);
            return () => clearInterval(interval);
        }, []);

        return ( <span> {timeZoneAbbr} {utcOffset} <span className="stats-other">{timeString}</span> </span>);
};

export default StatCurrentTime;