import { PrismaClient } from "@prisma/client";
import { parseDateOrNull } from "./utils/helpers";

const prisma = new PrismaClient();

const url = "https://a.klaviyo.com/api/profiles/?page[size]=100";

async function main() {
  //   const allUsers = await prisma.old_member.findMany();
  //   return console.log(allUsers);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      revision: "2023-10-15",
      Authorization: "Klaviyo-API-Key pk_3add90f57a50af43ea2c7ff594b731d769",
    },
  };

  const res = await fetch(url, options);
  const json = await res.json();
  for (let i = 0; i < json.data.length; i++) {
    const member = json.data[i];
    const data = {
      kl_unique_id: member.id,
      kl_external_id: member.attributes.external_id,
      membership_id: member.attributes.external_id,
      member_id: parseInt(member.attributes.properties.bant_member_id),
      type: member.type,
      first_name: member.attributes.first_name,
      last_name: member.attributes.last_name,
      street: member.attributes.properties.bant_street,
      member_status: member.attributes.properties.bant_member_status,
      town: member.attributes.properties.bant_town,
      county: member.attributes.properties.bant_county,
      region: member.attributes.properties.bant_region,
      post_code: member.attributes.properties.bant_post_code,
      date_of_birth: new Date(member.attributes.properties.bant_date_of_birth),
      sex: member.attributes.properties.bant_sex,
      renewal_date: new Date(member.attributes.properties.bant_renewal_date),
      membership_fee: parseFloat(
        member.attributes.properties.bant_membership_fee
      ),
      registration_fee: parseFloat(
        member.attributes.properties.bant_registration_fee
      ),
      on_register: member.attributes.properties.bant_on_register === "1",
      home_telephone: member.attributes.properties.bant_home_telephone,
      work_telephone: member.attributes.properties.bant_work_telephone,
      mobile: member.attributes.properties.bant_mobile,
      email: member.attributes.properties.bant_email,
      display_on_website:
        member.attributes.properties.bant_display_on_website === "1",
      eblast: member.attributes.properties.bant_eblast === "1",
      complaint: member.attributes.properties.bant_complaint === "1",
      press_contact: member.attributes.properties.bant_press_contact === "1",
      photo: member.attributes.properties.bant_photo,
      admin_notes: member.attributes.properties.bant_admin_notes,
      bant_council: member.attributes.properties.bant_bant_council === "1",
      seminar: member.attributes.properties.bant_seminar === "1",
      student_sit_in: member.attributes.properties.bant_student_sit_in === "1",
      last_modified_date: new Date(
        member.attributes.properties.bant_last_modified_date
      ),
      agm: member.attributes.properties.bant_agm === "1",
      ntc: member.attributes.properties.bant_ntc === "1",
      ngc: member.attributes.properties.bant_ngc === "1",
      recruitment: member.attributes.properties.bant_recruitment === "1",
      events: member.attributes.properties.bant_events === "1",
      enews: member.attributes.properties.bant_enews === "1",
      regional_coordinator:
        member.attributes.properties.bant_regional_coordinator === "1",
      renewal: member.attributes.properties.bant_renewal === "1",
      cnhc: member.attributes.properties.bant_cnhc === "1",
      cnhc_reg_no: member.attributes.properties.bant_cnhc_reg_no,
      cnhc_reg_exp_date: parseDateOrNull(
        member.attributes.properties.bant_cnhc_reg_exp_date
      ),
      cnhc_exemption: member.attributes.properties.bant_cnhc_exemption === "1",
      cnhc_exemption_exp_date: parseDateOrNull(
        member.attributes.properties.bant_cnhc_exemption_exp_date
      ),
      cpd:
        member.attributes.properties.bant_cpd == "-"
          ? null
          : member.attributes.properties.bant_cpd,
      cpd_exemption: member.attributes.properties.bant_cpd_exemption === "1",
      cpd_exemption_exp_date: parseDateOrNull(
        member.attributes.properties.bant_cpd_exemption_exp_date
      ),
      cpd_audit_completed:
        member.attributes.properties.bant_cpd_audit_completed === "1",
      cpd_audit_date: parseDateOrNull(
        member.attributes.properties.bant_cpd_audit_date
      ),
      cpd_next_audit_date: parseDateOrNull(
        member.attributes.properties.bant_cpd_next_audit_date
      ),
      cnhc_exemption_rsn: member.attributes.properties.bant_cnhc_exemption_rsn,
      cpd_audit_notes: member.attributes.properties.bant_cpd_audit_notes,
      practice_online:
        member.attributes.properties.bant_practice_online === "1",
      nonclinical: member.attributes.properties.bant_nonclinical === "1",
      practiceinperson:
        member.attributes.properties.bant_practiceinperson === "1",
    };

    if (!data.member_id) {
      console.log(
        `********************** problem with member id:${data.member_id}  ********************`
      );
      continue;
    }

    storeData(data, i);
  }
}

export async function storeData(membershipData: any, i: number) {
  try {
    // Create or update the record in the 'membership' table
    const result = await prisma.old_member.upsert({
      where: { member_id: membershipData.member_id },
      update: membershipData,
      create: membershipData,
    });

    console.log("Data stored successfully:" + i);
  } catch (error) {
    console.error("Error storing data:", error);
  } finally {
    await prisma.$disconnect(); // Close the Prisma client
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
