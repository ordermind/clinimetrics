export function calculateSWTScore(rawTime, protocol) {
    if(protocol === "singh") {
        return calculateScoreSingh(rawTime);
    }

    return calculateScoreHollywood(rawTime);
}

export function calculateSWTVo2Max({time, distance, protocol}) {
    if(protocol === "singh") {
        return calculateVo2MaxSingh(distance);
    }

    return calculateVo2MaxHollywood(time);
}

export function calculateSWTMets({time, distance, protocol}) {
    if(protocol === "singh") {
        return calculateMetsSingh(distance);
    }

    return calculateMetsHollywood(time);
}

function formatTimeMMSS(rawTime) {
    const [minutes, seconds] = rawTime.split(":").map(item => parseInt(item));

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function calculateScoreHollywood(rawTime) {
    const formattedTime = formatTimeMMSS(rawTime);

    if(formattedTime < "00:12") {
        return 0;
    }
    if(formattedTime < "00:24") {
        return 1;
    }
    if(formattedTime < "00:36") {
        return 2;
    }
    if(formattedTime < "00:48") {
        return 3;
    }
    if(formattedTime < "01:00") {
        return 4;
    }
    if(formattedTime < "01:12") {
        return 5;
    }
    if(formattedTime < "01:24") {
        return 6;
    }
    if(formattedTime < "01:36") {
        return 7;
    }
    if(formattedTime < "01:48") {
        return 8;
    }
    if(formattedTime < "02:00") {
        return 9;
    }
    if(formattedTime < "02:10") {
        return 10;
    }
    if(formattedTime < "02:20") {
        return 11;
    }
    if(formattedTime < "02:30") {
        return 12;
    }
    if(formattedTime < "02:40") {
        return 13;
    }
    if(formattedTime < "02:50") {
        return 14;
    }
    if(formattedTime < "03:00") {
        return 15;
    }
    if(formattedTime < "03:10") {
        return 16;
    }
    if(formattedTime < "03:20") {
        return 17;
    }
    if(formattedTime < "03:30") {
        return 18;
    }
    if(formattedTime < "03:40") {
        return 19;
    }
    if(formattedTime < "03:50") {
        return 20;
    }
    if(formattedTime < "04:00") {
        return 21;
    }
    if(formattedTime < "04:09") {
        return 22;
    }
    if(formattedTime < "04:17") {
        return 23;
    }
    if(formattedTime < "04:26") {
        return 24;
    }
    if(formattedTime < "04:35") {
        return 25;
    }
    if(formattedTime < "04:44") {
        return 26;
    }
    if(formattedTime < "04:53") {
        return 27;
    }
    if(formattedTime < "05:02") {
        return 28;
    }
    if(formattedTime < "05:11") {
        return 29;
    }
    if(formattedTime < "05:20") {
        return 30;
    }
    if(formattedTime < "05:29") {
        return 31;
    }
    if(formattedTime < "05:38") {
        return 32;
    }
    if(formattedTime < "05:47") {
        return 33;
    }
    if(formattedTime < "05:56") {
        return 34;
    }
    if(formattedTime < "06:05") {
        return 35;
    }
    if(formattedTime < "06:13") {
        return 36;
    }
    if(formattedTime < "06:21") {
        return 37;
    }
    if(formattedTime < "06:29") {
        return 38;
    }
    if(formattedTime < "06:37") {
        return 39;
    }
    if(formattedTime < "06:45") {
        return 40;
    }
    if(formattedTime < "06:53") {
        return 41;
    }
    if(formattedTime < "07:01") {
        return 42;
    }
    if(formattedTime < "07:09") {
        return 43;
    }
    if(formattedTime < "07:17") {
        return 44;
    }
    if(formattedTime < "07:25") {
        return 45;
    }
    if(formattedTime < "07:33") {
        return 46;
    }
    if(formattedTime < "07:41") {
        return 47;
    }
    if(formattedTime < "07:49") {
        return 48;
    }
    if(formattedTime < "07:57") {
        return 49;
    }
    if(formattedTime < "08:05") {
        return 50;
    }
    if(formattedTime < "08:12") {
        return 51;
    }
    if(formattedTime < "08:19") {
        return 52;
    }
    if(formattedTime < "08:27") {
        return 53;
    }
    if(formattedTime < "08:34") {
        return 54;
    }
    if(formattedTime < "08:41") {
        return 55;
    }
    if(formattedTime < "08:48") {
        return 56;
    }
    if(formattedTime < "08:55") {
        return 57;
    }
    if(formattedTime < "09:03") {
        return 58;
    }
    if(formattedTime < "09:11") {
        return 59;
    }
    if(formattedTime < "09:18") {
        return 60;
    }
    if(formattedTime < "09:25") {
        return 61;
    }
    if(formattedTime < "09:32") {
        return 62;
    }
    if(formattedTime < "09:40") {
        return 63;
    }
    if(formattedTime < "09:47") {
        return 64;
    }
    if(formattedTime < "09:54") {
        return 65;
    }
    if(formattedTime < "10:01") {
        return 66;
    }
    if(formattedTime < "10:07") {
        return 67;
    }
    if(formattedTime < "10:14") {
        return 68;
    }
    if(formattedTime < "10:20") {
        return 69;
    }
    if(formattedTime < "10:27") {
        return 70;
    }
    if(formattedTime < "10:33") {
        return 71;
    }
    if(formattedTime < "10:40") {
        return 72;
    }
    if(formattedTime < "10:46") {
        return 73;
    }
    if(formattedTime < "10:53") {
        return 74;
    }
    if(formattedTime < "11:00") {
        return 75;
    }
    if(formattedTime < "11:06") {
        return 76;
    }
    if(formattedTime < "11:12") {
        return 77;
    }
    if(formattedTime < "11:19") {
        return 78;
    }
    if(formattedTime < "11:25") {
        return 79;
    }
    if(formattedTime < "11:32") {
        return 80;
    }
    if(formattedTime < "11:38") {
        return 81;
    }
    if(formattedTime < "11:45") {
        return 82;
    }
    if(formattedTime < "11:51") {
        return 83;
    }
    if(formattedTime < "11:58") {
        return 84;
    }
    if(formattedTime < "12:04") {
        return 85;
    }
    if(formattedTime < "12:10") {
        return 86;
    }
    if(formattedTime < "12:16") {
        return 87;
    }
    if(formattedTime < "12:22") {
        return 88;
    }
    if(formattedTime < "12:28") {
        return 89;
    }
    if(formattedTime < "12:34") {
        return 90;
    }
    if(formattedTime < "12:40") {
        return 91;
    }
    if(formattedTime < "12:46") {
        return 92;
    }
    if(formattedTime < "12:52") {
        return 93;
    }
    if(formattedTime < "12:58") {
        return 94;
    }
    if(formattedTime < "13:04") {
        return 95;
    }
    if(formattedTime < "13:10") {
        return 96;
    }
    if(formattedTime < "13:16") {
        return 97;
    }
    if(formattedTime < "13:22") {
        return 98;
    }
    if(formattedTime < "13:28") {
        return 99;
    }
    if(formattedTime < "13:34") {
        return 100;
    }
    if(formattedTime < "13:40") {
        return 101;
    }
    if(formattedTime < "13:46") {
        return 102;
    }
    if(formattedTime < "13:52") {
        return 103;
    }
    if(formattedTime < "13:58") {
        return 104;
    }
    if(formattedTime < "14:03") {
        return 105;
    }
    if(formattedTime < "14:09") {
        return 106;
    }
    if(formattedTime < "14:14") {
        return 107;
    }
    if(formattedTime < "14:20") {
        return 108;
    }
    if(formattedTime < "14:25") {
        return 109;
    }
    if(formattedTime < "14:31") {
        return 110;
    }
    if(formattedTime < "14:36") {
        return 111;
    }
    if(formattedTime < "14:42") {
        return 112;
    }
    if(formattedTime < "14:47") {
        return 113;
    }
    if(formattedTime < "14:53") {
        return 114;
    }
    if(formattedTime < "14:58") {
        return 115;
    }
    if(formattedTime < "15:04") {
        return 116;
    }
    if(formattedTime < "15:09") {
        return 117;
    }
    if(formattedTime < "15:15") {
        return 118;
    }
    if(formattedTime < "15:20") {
        return 119;
    }
    if(formattedTime < "15:26") {
        return 129;
    }
    if(formattedTime < "15:31") {
        return 121;
    }
    if(formattedTime < "15:37") {
        return 122;
    }
    if(formattedTime < "15:42") {
        return 123;
    }
    if(formattedTime < "15:48") {
        return 124;
    }
    if(formattedTime < "15:53") {
        return 125;
    }
    if(formattedTime < "15:59") {
        return 126;
    }
    if(formattedTime < "16:04") {
        return 127;
    }
    if(formattedTime < "16:09") {
        return 128;
    }
    if(formattedTime < "16:14") {
        return 129;
    }
    if(formattedTime < "16:20") {
        return 130;
    }
    if(formattedTime < "16:25") {
        return 131;
    }
    if(formattedTime < "16:30") {
        return 132;
    }
    if(formattedTime < "16:35") {
        return 133;
    }
    if(formattedTime < "16:40") {
        return 134;
    }
    if(formattedTime < "16:45") {
        return 135;
    }
    if(formattedTime < "16:50") {
        return 136;
    }
    if(formattedTime < "16:56") {
        return 137;
    }
    if(formattedTime < "17:01") {
        return 138;
    }
    if(formattedTime < "17:06") {
        return 139;
    }
    if(formattedTime < "17:11") {
        return 149;
    }
    if(formattedTime < "17:16") {
        return 141;
    }
    if(formattedTime < "17:22") {
        return 142;
    }
    if(formattedTime < "17:27") {
        return 143;
    }
    if(formattedTime < "17:32") {
        return 144;
    }
    if(formattedTime < "17:38") {
        return 145;
    }
    if(formattedTime < "17:43") {
        return 146;
    }
    if(formattedTime < "17:48") {
        return 147;
    }
    if(formattedTime < "17:53") {
        return 148;
    }
    if(formattedTime < "17:59") {
        return 149;
    }

    return 150;
}

function calculateTimeInMinutes(rawTime) {
    const [minutes, _] = rawTime.split(":").map(item => parseInt(item));

    return minutes;
}

function calculateScoreSingh(rawTime) {
    return calculateTimeInMinutes(rawTime) + 1;
}

function calculateVo2MaxSingh(distance) {
    return 0.0438 * parseInt(distance) + 0.8569;
}

function calculateVo2MaxHollywood(rawTime) {
    return calculateMetsHollywood(rawTime) * 3.5;
}

function calculateMetsSingh(distance) {
    return calculateVo2MaxSingh(distance) / 3.5;
}

function calculateMetsHollywood(rawTime) {
    const formattedTime = formatTimeMMSS(rawTime);

    if(formattedTime < "02:10") {
        return 2.5;
    }
    if(formattedTime < "04:09") {
        return 3;
    }
    if(formattedTime < "06:13") {
        return 3.5;
    }
    if(formattedTime < "08:12") {
        return 4;
    }
    if(formattedTime < "10:07") {
        return 4.5;
    }
    if(formattedTime < "12:04") {
        return 5;
    }
    if(formattedTime < "14:03") {
        return 5.5;
    }
    if(formattedTime < "16:04") {
        return 6;
    }

    return 6.5;
}