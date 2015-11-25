exports.sql = {
	daily: 'SELECT issue_date AS date,\
            strftime(\'%m/%d\', issue_date) AS date_formatted,\
            COUNT(summons_id) AS ticket_count\
            FROM summons\
            GROUP BY date\
            ORDER BY date;',
    stateRank10: 'SELECT state,\
        COUNT(summons_id) AS ticket_count\
        FROM summons\
        GROUP BY state\
        ORDER BY ticket_count DESC\
        LIMIT 10;',
    makeRank10: 'SELECT vehicle_make,\
        COUNT(summons_id) AS ticket_count\
        FROM summons\
        GROUP BY vehicle_make\
        ORDER BY ticket_count DESC\
        LIMIT 10;'
};