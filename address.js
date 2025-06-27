
    const First_address = document.querySelector('.First_address');
    const second_address = document.querySelector('.second_address');
    const third_address = document.querySelector('.third_address');
    const fourth_address = document.querySelector('.fourth_address');
    const cidr = document.querySelector('.cidr');
    const search_but = document.querySelector('.search_but');
    const result = document.querySelector('.result');

    
    function ipToInt(a, b, c, d) {
      return ((a << 24) >>> 0) + (b << 16) + (c << 8) + d;
    }

    
    function intToIp(ipInt) {
      return [
        (ipInt >>> 24) & 255,
        (ipInt >>> 16) & 255,
        (ipInt >>> 8) & 255,
        ipInt & 255
      ].join('.');
    }

    
    function cidrToMask(cidr) {
      let mask = 0xffffffff << (32 - cidr);
      return intToIp(mask >>> 0);
    }

    search_but.addEventListener("click", (e) => {
      e.preventDefault();

      const a1 = Number(First_address.value.slice(0, 3));
      const a2 = Number(second_address.value.slice(0, 3));
      const a3 = Number(third_address.value.slice(0, 3));
      const a4 = Number(fourth_address.value.slice(0, 3));
      const cidrVal = Number(cidr.value.slice(0, 2));

      
      if (
        a1 >= 0 && a1 <= 255 &&
        a2 >= 0 && a2 <= 255 &&
        a3 >= 0 && a3 <= 255 &&
        a4 >= 0 && a4 <= 255 &&
        cidrVal >= 0 && cidrVal <= 32
      ) {
        const ipInt = ipToInt(a1, a2, a3, a4);
        const maskInt = 0xffffffff << (32 - cidrVal);
        const subnetMask = cidrToMask(cidrVal);
        const networkInt = ipInt & maskInt;
        const broadcastInt = networkInt | (~maskInt >>> 0);
        const usableHosts = cidrVal >= 31 ? 0 : Math.pow(2, 32 - cidrVal) - 2;

        const networkAddress = intToIp(networkInt);
        const broadcastAddress = intToIp(broadcastInt);

        result.innerHTML = `
          <p style="border: 2px solid red;"><strong>IP-Address:</strong> ${a1}.${a2}.${a3}.${a4}/${cidrVal}</p>
          <p style="border: 2px solid green;"><strong>Subnet Mask:</strong> ${subnetMask}</p>
          <p style="border: 2px solid red;"><strong>Network Address:</strong> ${networkAddress}</p>
          <p style="border: 2px solid green;"><strong>Broadcast Address:</strong> ${broadcastAddress}</p>
          <p style="border: 2px solid red;"><strong>Usable Hosts:</strong> ${usableHosts}</p>
        `;
      } 
      
      else {
             alert(`❌❌❌ Invalid input. Make sure IP is 0–255 and CIDR is 0–32.`)
      }
    });
